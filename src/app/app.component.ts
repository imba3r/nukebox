import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Cookies from 'es-cookie';
import { SessionService } from '@app/services/session.service';

export const INITIAL_KEY = 'not-set-yet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  session$;

  constructor(private router: Router, private sessionService: SessionService) {

  }

  ngOnInit() {
    this.restoreSession();
  }

  private restoreSession() {
    console.log('Attempting to restore session...');
    const sessionName = Cookies.get('sessionName');
    const userName = Cookies.get('userName');
    if (!sessionName || !userName) {
      console.log("No cookie set...");
    }
    else {
      this.sessionService.initializeSession(sessionName, userName)
        .subscribe(session => {
          console.log('Session restored!');
          if (!session || !session.spotifyKey || session.spotifyKey === INITIAL_KEY) {
            this.router.navigate(['/master/login']);
          } else {
            this.router.navigate(['/playlist']);
          }
        });
      this.session$ = this.sessionService.getSession();
    }
  }
}
