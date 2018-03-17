import {Component, OnInit} from '@angular/core';
import {SessionService} from '@app/services/session.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nbx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  masterUser: Observable<string>;
  users: Observable<Array<string>>;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.users = this.sessionService.getUsers();
    this.masterUser = this.sessionService.getMasterUser();
  }

}
