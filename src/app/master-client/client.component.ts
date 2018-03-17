import { Component, OnInit } from '@angular/core';
import { SessionService } from '@app/services/session.service';
import { Router } from '@angular/router';
import * as Cookies from 'es-cookie';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { INITIAL_KEY } from '@app/app.component';

@Component({
  selector: 'nbx-client',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

  userName: string;
  sessionName: string;

  constructor(private sessionService: SessionService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogInSession = () => {
    this.sessionService.initializeSession(this.userName, this.sessionName)
      .pipe(
        map(session => session.spotifyKey),
        tap(key => {
          console.log("Moin!", key);
          if (!key || key === INITIAL_KEY) {
            console.log("Not a valid key. Going to master login");
            this.router.navigate(['/master/login']);
          } else {
            console.log("Valid key. Going to playlist");
            this.router.navigate(['/playlist']);
          }
        })
      ).subscribe();
    Cookies.set('sessionName', this.sessionName);
    Cookies.set('userName', this.userName);
  }
}
