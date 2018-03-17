import { Component, OnInit } from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Router} from '@angular/router';
import {MasterPlaylistService} from '@app/master-client/service/master-playlist-service';
import {SessionService} from '@app/services/session.service';
import {distinctUntilChanged, filter, first, tap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'nbx-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {

  constructor(private oauth2Service: Oauth2Service,
              private router: Router,
              private playlistService: MasterPlaylistService,
              private sessionService: SessionService
  ) { }

  ngOnInit() {
    console.log("initializing login callback");
    this.oauth2Service.registerOAuthData(location.hash);
    this.sessionService.setSpotifyKey(this.oauth2Service.currentToken);
    this.sessionService.getMasterUser()
      .pipe(
        filter(user => {
        console.log("user", user);
        return !isNullOrUndefined(user);
      }),
        first(),
        tap((user) => console.log("user after filter", user)))
      .subscribe( masterUser => {
        console.log('masterUser', masterUser);
        this.playlistService.initPlaylist(masterUser)
          .subscribe(() => this.router.navigate(['/playlist']));
      });
  }

}
