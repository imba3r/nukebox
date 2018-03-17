import {Injectable, OnDestroy} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpotifyUser} from '@app/master-client/types/SpotifyUser';
import {concatMap, filter, map, switchMap, tap} from 'rxjs/operators';
import {SpotifyPlaylist} from '@app/types/spotify/spotify-playlist';
import {SessionService} from '@app/services/session.service';
import {isNullOrUndefined} from 'util';
import {FireStoreTrack} from '@app/types';

interface AddToPlaylistRequest {
  uris?: Array<string>;
  position?: number;
}

interface RemovedTrack {
  positions?: Array<number>;
  uri: string;
}

interface RemoveFromPlaylistRequest {
  tracks: Array<RemovedTrack>;
}

interface CreatePlaylistRequest {
  description?: string;
  public?: boolean;
  name?: string;
}


@Injectable()
export class MasterPlaylistService {
  private readonly addToQueueUri: string = 'https://api.spotify.com/v1/me/player/play';
  private readonly currentUserUrl: string = 'https://api.spotify.com/v1/me';
  private ngxPlaylist: SpotifyPlaylist;
  private spotifyUser: SpotifyUser;

  constructor(private oAuth2Service: Oauth2Service, private http: HttpClient, private sessionService: SessionService) {

  }


  public initMessageQueue = () => {
    console.info('Starting Messaging Queue service for master client');
    this.resolveUser()
      .subscribe(user => {
        this.spotifyUser = user;
        this.sessionService.getTrackQueue().pipe(
          map((tracks: Array<FireStoreTrack>) => {
            if (tracks.length > 0) {
              return tracks[0];
            } else {
              return null;
            }
          }),
          tap((track) => console.log('Retrieved firebase track from queue', track)),
          filter((fireStoreTrack: FireStoreTrack) => !isNullOrUndefined(fireStoreTrack)),
          tap(fireBaseTrack => this.addTrackToPlaylist(fireBaseTrack.trackId)),
          tap(() => console.log('Track added')),
          tap(fireBaseTrack => this.sessionService.removeQueuedTrack(fireBaseTrack)),
          tap(() => console.log('Removed from Queue'))
        ).subscribe();
      });
  }
  /**
   * Creates the NBX-Playlist
   */
  public initService = (): Observable<void> => {
    return this.resolveUser()
      .pipe(
        tap(x => this.spotifyUser = x),
        switchMap(user => {
          return this.createNGXPlaylist(user.id);
        }),
        tap(playlist => this.ngxPlaylist = playlist),
        map(playlist => {
          console.log('playlist initialized', playlist);
          return;
        })
      );
  }

  public addTrackToPlaylist = (trackId: string): Observable<string> => {
    const uri = `'https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.ngxPlaylist.id}/tracks'`;
    return this.authHeader().pipe(concatMap(options => {
      return this.http.post<void>(uri, this.addTrackRequest(trackId), options)
        .pipe(map(() => trackId));
    }));
  }

  public removeTrackFromPlaylist = (trackId: string): Observable<void> => {
    const uri = `'https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.ngxPlaylist.id}/tracks'`;
    return this.authHeader().pipe(concatMap(options => {
      const finalOptions = Object.assign(options, {
        body: this.removeTrackRequest([trackId])
      });
      return this.http.delete<void>(uri, finalOptions).pipe(map(() => null));
    }));
  }

  private resolveUser = () => {
    return this.authHeader().pipe(concatMap(options => {
      return this.http.get<SpotifyUser>(this.currentUserUrl, options as any);
    }));
  }

  private createNGXPlaylist = (userId: string) => {
    const uri = `https://api.spotify.com/v1/users/${userId}/playlists`;
    return this.authHeader().pipe(
      concatMap(options => {
        return this.http.post<SpotifyPlaylist>(uri, this.createNGXPlaylistRequest(), options);
      })
    );
  }

  private addTrackRequest(trackId: string): AddToPlaylistRequest {
    return {
      uris: [trackId]
    };
  }

  private authHeader(): Observable<any> {
    return this.sessionService.getSpotifyKey()
      .pipe(map(key => {
        return {
          headers: new HttpHeaders({'Authorization': `Bearer ${key}`})
        };
      }));
  }

  private createNGXPlaylistRequest(): CreatePlaylistRequest {
    return {
      name: '##-NGX-PLST-##',
      description: 'NGX Playlist',
      public: false
    };
  }

  private removeTrackRequest(trackIds: Array<string>): RemoveFromPlaylistRequest {
    const tracks = trackIds.map(this.mapToTrack);
    return {
      tracks: tracks
    };
  }

  private mapToTrack = (trackId: string): RemovedTrack => {
    return {
      uri: trackId
    };
  }
}
