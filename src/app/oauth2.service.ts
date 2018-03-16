import { Injectable } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {escape} from 'querystring';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';

@Injectable()
export class Oauth2Service {

  private static readonly AUTH_URL = 'https://accounts.spotify.com/authorize';
  private static readonly CLIENT_ID = '0a55940da092461c91d3aff4cef561b0';
  private static readonly RESPONSE_TYPE = 'token';
  private static readonly redirect_uri = 'http://localhost:4200/master/login/success';

  private accessToken: string;
  private tokenType: string;
  private expiresIn: number;

  private _tokenChanges = new Subject<string>();


  constructor(private router: Router) { }

  public requestAuthorization() {
    const extras: NavigationExtras = {
      queryParams: {
        'client_id': Oauth2Service.CLIENT_ID,
        'response_type': Oauth2Service.RESPONSE_TYPE,
        'redirect_uri': Oauth2Service.redirect_uri
      }
    };
    const clientId = Oauth2Service.CLIENT_ID;
    const responseType = Oauth2Service.RESPONSE_TYPE;
    const redirect_uri = encodeURIComponent(Oauth2Service.redirect_uri);
    window.location.href = `${Oauth2Service.AUTH_URL}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirect_uri}`;
  }

  public tokenChanges(): Observable<string> {
    return this._tokenChanges.pipe(tap(console.log));
  }

  public get currentToken(): string {
    return this.accessToken;
  }

  public registerOAuthData(hashString: string) {
    const params = this.getParameters(hashString);
    this.accessToken = params['access_token'];
    this.tokenType = params['token_type'];
    this.expiresIn = parseInt(params['expires_in'], 0);
    this._tokenChanges.next(params['access_token']);
  }

  private getParameters(hashString: string) {
    const hashParams = {};
    const hashArray = hashString.substring(1).split('&');
    hashArray.forEach(value => {
      const keyValPair = value.split('=');
      hashParams[keyValPair[0]] = keyValPair[1];
    })
    return hashParams;
  }

}
