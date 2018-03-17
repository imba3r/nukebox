import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Track} from '@app/types';

@Component({
  selector: 'nbx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() masterUser: string;
  @Input() users: Array<string>;

  constructor() {

  }

  ngOnInit() {
  }

}
