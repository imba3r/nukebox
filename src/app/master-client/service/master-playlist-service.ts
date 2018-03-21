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


  public initMasterService = () => {
    this.sessionService.getSpotifyPlaylistId().subscribe(value => {
      this.spotifyPlaylistId = value;
      this.initTrackQueue();
      this.initVotingMechanism();
    });
    console.log('Starting Messaging Queue service for master client');

  };

  private initTrackQueue = () => {
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
          tap(fireBaseTrack => this.addTrackToPlaylist(fireBaseTrack.trackUri).subscribe()),
          tap(() => console.log('Track added')),
          tap(fireBaseTrack => this.sessionService.removeQueuedTrack(fireBaseTrack)),
          tap(fireBaseTrack => this.sessionService.addToPlaylist(fireBaseTrack)),
          tap(() => console.log('Removed from Queue'))
        ).subscribe();
      });
  };

  private initVotingMechanism = () => {
    console.debug("Initializing Voting Mechanism");
    this.sessionService.getPlaylist().subscribe(playlist => {
      // Each time a playlist change occurs, check if anything has to be kicked out
      const itemsToBeDeleted = playlist.filter(track => track.votes < 0);
      itemsToBeDeleted.forEach(item => {
        console.debug('Removing item', item);
        this.removeTrackFromPlaylist(item.trackUri).toPromise().then(() => {
          this.sessionService.removeFromPlaylist(item).then(() => console.debug('Master Playlist service deleted track', item))
        }) .catch(error => console.error('Could not delete track in master playlist service:', error));
      });
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

  public addTrackToPlaylist = (trackUri: string): Observable<string> => {
    const uri = `https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.spotifyPlaylistId}/tracks`;
    return this.sessionService.getSpotifyKey()
      .pipe(distinctUntilChanged(),
        concatMap(key => {
          return this.http.post<void>(uri, MasterPlaylistService.addTrackRequest(trackUri), MasterPlaylistService.authHeader(key))
            .pipe(map(() => trackUri));
        }));
  };

  public removeTrackFromPlaylist = (trackUri: string): Observable<void> => {
    const uri = `https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.spotifyPlaylistId}/tracks`;
    return this.sessionService.getSpotifyKey()
      .pipe(distinctUntilChanged(),
        concatMap(key => {
        const finalOptions = Object.assign(MasterPlaylistService.authHeader(key), {
          body: this.removeTrackRequest([trackUri])
        });
        return this.http.delete<void>(uri, finalOptions).pipe(map(() => null));
      }));
  };

  private resolveUser = () => {
    return this.sessionService.getSpotifyKey()
      .pipe(
        switchMap(key => {
          return this.http.get<SpotifyUser>(this.currentUserUrl, MasterPlaylistService.authHeader(key));
        }));
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
  }
}
