import { Injectable } from '@angular/core';
import { Auth, Playlist, SpotifyConfig } from '@app/types';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SessionService {

  private auth$: Observable<Auth>;
  private playlist$: Observable<Playlist>;
  private spotifyConfig$: Observable<SpotifyConfig>;

  constructor(db: AngularFirestore) {
    this.auth$ = db.doc<Auth>('app-data/auth').valueChanges();
    this.playlist$ = db.doc<Playlist>('app-data/playlist').valueChanges();
    this.spotifyConfig$ = db.doc<SpotifyConfig>('app-data/spotify').valueChanges();
  }

  public getSpotifyPublicKey(): Observable<string> {
    return this.spotifyConfig$.pipe(map((c: SpotifyConfig) => c.publicKey));
  }

  public getSpotifyPrivateKey(): Observable<string> {
    return this.spotifyConfig$.pipe(map((c: SpotifyConfig) => c.privateKey));
  }

  public isMaster(): Observable<boolean> {
    return this.auth$.pipe(map((a: Auth) => !a.master || a.master === ""));
  }
}
