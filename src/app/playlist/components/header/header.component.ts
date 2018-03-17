import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nbx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() masterUser: string;

  constructor() { }

  ngOnInit() {
  }

}
