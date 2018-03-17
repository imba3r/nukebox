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

  private playlistCollection: AngularFirestoreCollection<FireStoreTrack>;
  private playlist$: Observable<FireStoreTrack[]>;

  constructor(private db: AngularFirestore) {
  };

  initializeSession(userName: string, sessionName: string) {
    this.sessionDoc = this.db.collection('sessions').doc(sessionName);
    this.session$ = this.sessionDoc.valueChanges();

    this.playlistCollection = this.sessionDoc.collection<FireStoreTrack>('playlist');
    this.playlist$ = this.playlistCollection.valueChanges();

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
    return this.session$.map(session => session && session.spotifyKey || '');
  }

  setSpotifyKey(key: string) {
    this.sessionDoc.update({spotifyKey: key});
  }

  getMasterUser(): Observable<string> {
    return this.session$.map(session => session.masterUser);
  }

  getUsers(): Observable<string[]> {
    return this.session$.map(session => session.users);
  }

  getSession(): Observable<FireStoreSession> {
    return this.session$;
  }

  getPlaylist(): Observable<FireStoreTrack[]> {
    return this.playlist$;
  }

  addToPlaylist(track: FireStoreTrack) {
    this.playlistCollection.doc(track.trackId)
      .set({...track, dateAdded: new Date().toISOString()});
  }

  private createSession(userName: string): FireStoreSession {
    return {
      masterUser: userName,
      spotifyKey: 'not-set-yet',
      users: [userName],
    };
  }
}
