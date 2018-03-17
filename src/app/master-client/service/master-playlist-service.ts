import {Injectable, OnDestroy} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SpotifyUser} from '@app/master-client/types/SpotifyUser';
import {map, switchMap, tap} from 'rxjs/operators';
import {SpotifyPlaylist} from '@app/types/spotify/spotify-playlist';
import {flatMap} from 'tslint/lib/utils';

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

  constructor(private oAuth2Service: Oauth2Service, private http: HttpClient) {

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

  public addTrackToPlaylist = (trackId: string): Observable<void> => {
    const uri = `'https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.ngxPlaylist.id}/tracks'`;
    return this.http.post<void>(this.addToQueueUri, this.addTrackRequest(trackId), this.authHeader());
  }

  public removeTrackFromPlaylist = (trackId: string): Observable<void> => {
    const uri = `'https://api.spotify.com/v1/users/${this.spotifyUser.id}/playlists/${this.ngxPlaylist.id}/tracks'`;
    const options = {
      headers: {
        'Authorization': 'Bearer ' + this.oAuth2Service.currentToken
      },
      body: this.removeTrackRequest([trackId])
    };
    return this.http.delete<void>(uri, options);
  }

  private resolveUser = () => {
    return this.http.get<SpotifyUser>(this.currentUserUrl, this.authHeader());
  }

  private createNGXPlaylist = (userId: string) => {
    const uri = `https://api.spotify.com/v1/users/${userId}/playlists`;
    return this.http.post<SpotifyPlaylist>(uri, this.createNGXPlaylistRequest(), this.authHeader());
  }

  private addTrackRequest(trackId: string): AddToPlaylistRequest {
    return {
      uris: [trackId]
    };
  }

  private authHeader() {
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.oAuth2Service.currentToken}`});
    console.log(headers);
    console.log(this.oAuth2Service.currentToken);
    return {
      headers: headers
    };
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