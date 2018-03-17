import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FireStoreTrack, Track } from './types';
import { SessionService } from './services/session.service';
import { concatMap, map } from 'rxjs/operators';

interface SearchResult {
  tracks: {
    items: Track[];
  }
}

@Injectable()
export class SearchService {

  private API_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private sessionService: SessionService) {
  }

  public search(title: string): Observable<Track[]> {
    return this.sessionService.getSpotifyKey().pipe(
      map(token => this.getHeader(token)),
      concatMap((header) => this.http.get<SearchResult>(`${this.API_URL}/search?q=${title}&type=track`, {headers: header})),
      map(result => result.tracks.items)
    );
  }

  public fetch(track: FireStoreTrack): Observable<Track> {
    return this.sessionService.getSpotifyKey().pipe(
      map(token => this.getHeader(token)),
      concatMap((header) => this.http.get<Track>(`${this.API_URL}/tracks/${track.trackId}`, {headers: header})),
    );
  }

  private getHeader(token: string) {
    console.log(token);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + token);
    return headers;
  }
}
