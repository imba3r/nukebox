import {Component, OnInit} from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nbx-master-client',
  templateUrl: './master-client.component.html',
})
export class MasterClientComponent implements OnInit {

  accessToken: Observable<string>;

  constructor(private oAuth2Service: Oauth2Service) {
  }

  ngOnInit(): void {
    this.accessToken = this.oAuth2Service.tokenChanges();
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
