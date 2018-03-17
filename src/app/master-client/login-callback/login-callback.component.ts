import { Component, OnInit } from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Router} from '@angular/router';
import {MasterPlaylistService} from '@app/master-client/service/master-playlist-service';

@Component({
  selector: 'nbx-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {

  constructor(private oauth2Service: Oauth2Service, private router: Router, private playlistService: MasterPlaylistService) { }

  ngOnInit() {
    this.oauth2Service.registerOAuthData(location.hash);
    this.playlistService.initService()
      .subscribe(() => this.router.navigate(['/']));
  }

}
