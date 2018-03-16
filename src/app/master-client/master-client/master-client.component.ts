import {Component, OnInit} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nbx-master-client',
  templateUrl: './master-client.component.html',
})
export class MasterClientComponent implements OnInit {

  accessToken: string;

  constructor(private oAuth2Service: Oauth2Service) {
  }

  ngOnInit(): void {
    this.accessToken = this.oAuth2Service.currentToken;
  }


  public login() {
    this.oAuth2Service.requestAuthorization();
  }

  public logout() {
  }

  public get userName() {
    return '';
  }

}
