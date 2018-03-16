import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  private API_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {

  }

  public search(title: string) {
    this.http.get(`${this.API_URL}/search`,)
  }
}
