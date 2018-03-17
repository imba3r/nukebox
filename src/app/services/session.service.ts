import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FireStoreSession, FireStoreTrack } from '@app/types';
import { isNullOrUndefined } from 'util';

@Injectable()
export class SessionService {

  private session$: Observable<FireStoreSession>;
  private sessionDoc: AngularFirestoreDocument<FireStoreSession>;

  trackQueueCollection: AngularFirestoreCollection<FireStoreTrack>;
  trackQueue$: Observable<FireStoreTrack[]>;

  private playlistCollection: AngularFirestoreCollection<FireStoreTrack>;
  private playlist$: Observable<FireStoreTrack[]>;

  constructor(private db: AngularFirestore) {
  };

  initializeSession(userName: string, sessionName: string) {
    this.sessionDoc = this.db.collection('sessions').doc(sessionName);
    this.session$ = this.sessionDoc.valueChanges();

    this.playlistCollection = this.sessionDoc.collection<FireStoreTrack>('playlist');
    this.playlist$ = this.playlistCollection.valueChanges();

    this.trackQueueCollection = this.sessionDoc.collection<FireStoreTrack>('trackQueue');
    this.trackQueue$ = this.trackQueueCollection.valueChanges();

    this.sessionDoc.snapshotChanges().pipe(
      tap(v => console.log(v)),
      map(snapshot => snapshot.payload.exists),
      withLatestFrom(this.session$),
      take(1),
      map(([exists, session]) => {
        if (!exists) {
          this.sessionDoc.set(this.createSession(userName));
        }
        else if (!session.users.find(name => name === userName)) {
          this.sessionDoc.update({users: [...session.users, userName]});
        }
        return session
      })
    ).subscribe();

    return this.session$.pipe(filter(session => !isNullOrUndefined(session)));
  }

  getSpotifyKey(): Observable<string> {
    return this.session$.map(session => {
      console.log('Test');
      if (session) {

        return session.spotifyKey;
      }
      return '';
    });
  }

  setSpotifyKey(key: string) {
    this.sessionDoc.update({spotifyKey: key});
  }

  getMasterUser(): Observable<string> {
    return this.session$.map(session => {
      if (session) {
        return session.masterUser;
      }
      return '';
    });
  }

  getUsers(): Observable<string[]> {
    return this.session$.map(session => {
      if (session) {
        return session.users;
      }
      return [];
    });
  }

  getSession(): Observable<FireStoreSession> {
    return this.session$;
  }

  getPlaylist(): Observable<FireStoreTrack[]> {
    return this.playlist$;
  }

  /**
   * Only to be called by the master device!!
   */
  addToPlaylist(track: FireStoreTrack) {
    this.playlistCollection.doc(track.trackId).set(track);
  }

  getTrackQueue(): Observable<FireStoreTrack[]> {
    return this.trackQueue$;
  }

  /**
   * Clients may add tracks here, the master will collect them and call addToPlaylist on their behalf.
   */
  addToTrackQueue(track: FireStoreTrack) {
    const queuedTrack = {...track, dateAdded: new Date().toISOString()};
    this.trackQueueCollection.doc(track.trackId).set(queuedTrack);
  }

  private createSession(userName: string): FireStoreSession {
    return {
      masterUser: userName,
      spotifyKey: 'not-set-yet',
      users: [userName],
    };
  }
}
