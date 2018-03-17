import {Component, Input, OnInit} from '@angular/core';
import {Device} from '@app/playlist/types/device';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import * as Cookies from 'es-cookie';
import {SESSION_COOKIE_NAME, USERNAME_COOKIE_NAME} from '@app/app.component';

@Component({
  selector: 'nbx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() masterUser: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['']);
    Cookies.remove(SESSION_COOKIE_NAME);
    Cookies.remove(USERNAME_COOKIE_NAME);
  }

}
