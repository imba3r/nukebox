import {Injectable, OnDestroy} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpotifyUser} from '@app/master-client/types/SpotifyUser';
import {concatMap, distinctUntilChanged, filter, first, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
  private spotifyPlaylistId: string;
  private spotifyUser: SpotifyUser;

  constructor(private oAuth2Service: Oauth2Service, private http: HttpClient, private sessionService: SessionService) {

  }

  private static addTrackRequest(trackId: string): AddToPlaylistRequest {
    return {
      uris: [trackId]
    };
  }

  private static authHeader(key: string) {
    return {
      headers: new HttpHeaders({'Authorization': `Bearer ${key}`})
    };
  }

  private static createNGXPlaylistRequest(playlistSuffix: string): CreatePlaylistRequest {
    return {
      name: '##-NGX-PLST-##-' + playlistSuffix,
      description: 'NGX Playlist',
      public: false
    };
  }

  public initMessageQueue = () => {
    this.sessionService.getSpotifyPlaylistId().subscribe(value => {
      this.spotifyPlaylistId = value;
    });
    console.log('Starting Messaging Queue service for master client');
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
          tap(fireBaseTrack => this.addTrackToPlaylist(fireBaseTrack.trackId).subscribe()),
          tap(() => console.log('Track added')),
          tap(fireBaseTrack => this.sessionService.removeQueuedTrack(fireBaseTrack)),
          tap(() => console.log('Removed from Queue'))
        ).subscribe();
      });
  };
  /**
   * Creates the NBX-Playlist
   */
  public initPlaylist = (playlistSuffix: string): Observable<void> => {
    return this.resolveUser()
      .pipe(
        tap(x => this.spotifyUser = x),
        switchMap(user => {
          return this.createNGXPlaylist(user.id, playlistSuffix);
        }),
        tap(playlist => {
          console.log('Created playlist', playlist);
          this.spotifyPlaylistId = playlist.id;
          this.sessionService.setSpotifyPlaylistId(playlist.id);
        }),
        map(playlist => {
          console.log('playlist initialized', playlist);
          return;
        })
      );
  };

  public addTrackToPlaylist = (trackId: string): Observable<string> => {
    const uri = `https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.spotifyPlaylistId}/tracks`;
    return this.sessionService.getSpotifyKey().pipe(distinctUntilChanged(), concatMap(key => {
      return this.http.post<void>(uri, MasterPlaylistService.addTrackRequest(trackId), MasterPlaylistService.authHeader(key))
        .pipe(map(() => trackId));
    }));
  };

  public removeTrackFromPlaylist = (trackId: string): Observable<void> => {
    const uri = `https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.spotifyPlaylistId}/tracks`;
    return this.sessionService.getSpotifyKey()
      .pipe(concatMap(key => {
        const finalOptions = Object.assign(MasterPlaylistService.authHeader(key), {
          body: this.removeTrackRequest([trackId])
        });
        return this.http.delete<void>(uri, finalOptions).pipe(map(() => null));
      }));
  };

  private resolveUser = () => {
    return this.sessionService.getSpotifyKey()
      .pipe(
        switchMap(key => {
          return this.http.get<SpotifyUser>(this.currentUserUrl, MasterPlaylistService.authHeader(key));
        }),
        tap(() => console.log("Resolve user should only trigger once")));
  };

  private createNGXPlaylist = (userId: string, playlistSuffix: string) => {
    const uri = `https://api.spotify.com/v1/users/${userId}/playlists`;
    return this.sessionService.getSpotifyKey()
      .pipe(concatMap(key => {
        return this.http.post<SpotifyPlaylist>(uri,
          MasterPlaylistService.createNGXPlaylistRequest(playlistSuffix),
          MasterPlaylistService.authHeader(key));
      }));
  };

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
  };
}
