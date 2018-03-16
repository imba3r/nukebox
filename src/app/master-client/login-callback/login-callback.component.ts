import { Component, OnInit } from '@angular/core';
import {Oauth2Service} from '@app/oauth2.service';
import {Router} from '@angular/router';

@Component({
  selector: 'nbx-login-callback',
  templateUrl: './login-callback.component.html',
})
export class LoginCallbackComponent implements OnInit {

  constructor(private oauth2Service: Oauth2Service, private router: Router) { }

  ngOnInit() {
    this.oauth2Service.registerOAuthData(location.hash);
    this.router.navigate(['/']);
    console.debug("Navigating back to main.")
  }

}
