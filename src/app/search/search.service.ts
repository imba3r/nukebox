import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';
import {Track} from '@app/types';

interface SearchResult {
  tracks: {
    items: Track[];
  }
}

@Injectable()
export class SearchService {

  private API_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private oAuth: Oauth2Service) {
  }

  public search(title: string): Observable<Track[]> {

    const token = this.oAuth.currentToken;

    if (token) {
      const headers = this.getHeader(token);
      return this.http.get<SearchResult>(`${this.API_URL}/search?q=`+ title + `&type=track`, { headers: headers })
        .map((result) => result.tracks.items);
    } else {
      return null;
    }
  }

  private getHeader(token: string) {
    token = 'M7MK35CuNfHVNnJEpwxNpa43QD_4tStV&VER=8&RID=rpc&SID=ROtu-daJmz93a-jMRLSgzg&CI=0&AID=0&TYPE=xmlhttp&zx=gcvr3wn40yeu&t';
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('authorization', 'Bearer ' + token);
    return headers;
  }
}
