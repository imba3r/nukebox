import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { FireStoreSession } from '@app/types';

@Injectable()
export class SessionService {

  session$: Observable<FireStoreSession>;
  sessionDoc: AngularFirestoreDocument<FireStoreSession>;

  constructor(private db: AngularFirestore) {
  };

  initializeSession(userName: string, sessionName: string) {
    this.sessionDoc = this.db.collection('sessions').doc(sessionName);
    this.session$ = this.sessionDoc.valueChanges();

    this.sessionDoc.snapshotChanges().pipe(
      tap(v => console.log(v)),
      map(snapshot => snapshot.payload.exists),
      withLatestFrom(this.session$),
      take(1)
    ).subscribe(([exists, session]) => {
      if (!exists) {
        this.sessionDoc.set(this.createSession(userName));
      }
      if (!session.users.find(name => name === userName)) {
        this.sessionDoc.update({users: [...session.users, userName]});
      }
    });
  }

  getSpotifyKey(): Observable<string> {
    return this.session$.map(session => session.spotifyKey);
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

  private createSession(userName: string): FireStoreSession {
    return {
      masterUser: userName,
      spotifyKey: 'not-set-yet',
      users: [userName],
    };
  }
}
