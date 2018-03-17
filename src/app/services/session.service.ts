import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FireStoreSession, FireStoreTrack } from '@app/types';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SessionService {

  private sessionDoc: AngularFirestoreDocument<FireStoreSession>;
  private trackQueueCollection: AngularFirestoreCollection<FireStoreTrack>;
  private playlistCollection: AngularFirestoreCollection<FireStoreTrack>;

  constructor(private db: AngularFirestore) {
  }

  initializeSession(userName: string, sessionName: string): Observable<FireStoreSession> {
    this.sessionDoc = this.db.collection('sessions').doc(sessionName);
    this.playlistCollection = this.sessionDoc.collection<FireStoreTrack>('playlist');
    this.trackQueueCollection = this.sessionDoc.collection<FireStoreTrack>('trackQueue');

    this.sessionDoc.snapshotChanges().pipe(
      tap(v => console.log(v)),
      map(snapshot => snapshot.payload.exists),
      withLatestFrom(this.sessionDoc.valueChanges()),
      take(1),
      map(([exists, session]) => {
        if (!exists) {
          this.sessionDoc.set(this.createSession(userName));
        } else if (!session.users.find(name => name === userName)) {
          this.sessionDoc.update({users: [...session.users, userName]});
        }
        return session;
      })
    ).subscribe();

    return this.sessionDoc.valueChanges().pipe(filter(session => !isNullOrUndefined(session)));
  }

  getSpotifyKey(): Observable<string> {
    return this.sessionDoc.valueChanges().pipe(map(session => {
      if (session) {
        return session.spotifyKey;
      }
      return '';
    }));
  }

  setSpotifyKey(key: string) {
    this.sessionDoc.update({spotifyKey: key});
  }

  getMasterUser(): Observable<string> {
    return this.sessionDoc.valueChanges().pipe(map(session => {
      if (session) {
        return session.masterUser;
      }
      return '';
    }));
  }

  getUsers(): Observable<string[]> {
    return this.sessionDoc.valueChanges().pipe(map(session => {
      if (session) {
        return session.users;
      }
      return [];
    }));
  }

  getSession(): Observable<FireStoreSession> {
    return this.sessionDoc.valueChanges();
  }

  getPlaylist(): Observable<FireStoreTrack[]> {
    return this.playlistCollection.valueChanges();
  }

  /**
   * Only to be called by the master device!!
   */
  addToPlaylist(track: FireStoreTrack): void {
    this.playlistCollection.doc(track.trackId).snapshotChanges()
      .pipe(
        take(1),
        tap(snapshot => {
          const exists = snapshot.payload.exists;
          if (exists) {
            console.error('Attempted to add track twice to playlist ', track);
          } else {
            this.playlistCollection.doc(track.trackId).set(track);
          }
        }))
      .subscribe();
  }

  getTrackQueue(): Observable<FireStoreTrack[]> {
    return this.trackQueueCollection.valueChanges();
  }

  /**
   * Clients may add tracks here, the master will collect them and call addToPlaylist on their behalf.
   */
  addToTrackQueue(track: FireStoreTrack, votes?: number): void {
    const queuedTrack = {
      ...track,
      dateAdded: new Date().toISOString(),
      votes: votes || 1,
    };

    this.trackQueueCollection.doc(track.trackId).snapshotChanges()
      .pipe(
        take(1),
        tap(snapshot => {
          const exists = snapshot.payload.exists;
          if (exists) {
            console.error('Attempted to add track twice to queue', track);
          } else {
            this.trackQueueCollection.doc(track.trackId).set(queuedTrack);
          }
        }))
      .subscribe();
  }

  removeQueuedTrack(track: FireStoreTrack): void {
    this.trackQueueCollection.doc(track.trackId).delete()
      .then(value => console.log(value))
      .catch(value => console.error(value));
  }

  upvoteTrack(track: FireStoreTrack, votes?: number): void {
    this.playlistCollection.doc(track.trackId).snapshotChanges()
      .pipe(
        take(1),
        tap(snapshot => {
          const exists = snapshot.payload.exists;
          if (exists) {
            const track = snapshot.payload.data() as FireStoreTrack;
            const newVotes = (track.votes || 1) + (votes || 1);
            this.playlistCollection.doc(track.trackId).update({votes: newVotes});
            console.log(`Upvoted track ${track.trackId} from ${track.votes} to ${newVotes}`);
          } else {
            console.error('Attempted to upvote an unknown track! ', track);
          }
        }))
      .subscribe();
  }

  private createSession(userName: string): FireStoreSession {
    return {
      masterUser: userName,
      spotifyKey: 'not-set-yet',
      users: [userName],
    };
  }
}
