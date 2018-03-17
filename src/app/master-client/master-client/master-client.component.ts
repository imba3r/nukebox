import {Component, OnInit} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';
import * as Cookies from 'es-cookie';
import {SESSION_COOKIE_NAME, USERNAME_COOKIE_NAME} from '@app/app.component';
import {Router} from '@angular/router';
import {SessionService} from '@app/services/session.service';

@Component({
  selector: 'nbx-master-client',
  templateUrl: './master-client.component.html',
})
export class MasterClientComponent implements OnInit {

  accessToken: string;

  constructor(private oAuth2Service: Oauth2Service, private router: Router, private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.accessToken = this.oAuth2Service.currentToken;
  }


  public login() {
    this.oAuth2Service.requestAuthorization();
  }

  public logout() {
    Cookies.remove(USERNAME_COOKIE_NAME);
    Cookies.remove(SESSION_COOKIE_NAME);
    this.router.navigate(['']);
  }

  public get userName() {
    return '';
  }

}
