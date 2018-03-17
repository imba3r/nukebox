import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Cookies from 'es-cookie';
import {SessionService} from '@app/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private sessionService: SessionService) {

  }

  ngOnInit() {
    this.restoreSession();
  }

  private restoreSession() {
    console.log('Attempting to restore session...');
    const sessionName = Cookies.get('sessionName');
    const userName = Cookies.get('userName');
    this.sessionService.initializeSession(sessionName, userName);
    this.sessionService.session$
      .subscribe(session => {
        console.log('Session restored!');
        if (!session.spotifyKey) {
          this.router.navigate(['/master/login']);
        } else {
          this.router.navigate(['/playlist']);
        }
      });
  }
}
