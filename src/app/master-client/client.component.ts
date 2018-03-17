import { Component, OnInit } from '@angular/core';
import {SessionService} from '@app/services/session.service';
import {Router} from '@angular/router';
import * as Cookies from 'es-cookie';

@Component({
  selector: 'nbx-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  userName: string;
  sessionName: string;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  onLogInSession = () => {
    this.sessionService.initializeSession(this.userName, this.sessionName);
    this.sessionService.getSpotifyKey()
      .subscribe(key => {
        console.debug("Spotify Key received on login process:", key);
        if (!key && key !== 'not-yet-defined') {
          console.log("Not a valid key. Going to master login");
          this.router.navigate(['/master/login']);
        } else {
          console.log("Valid key. Going to playlist");
          this.router.navigate(['/playlist']);
        }
      })
    Cookies.set('sessionName', this.sessionName);
    Cookies.set('userName', this.userName);
  }
}
