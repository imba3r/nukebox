import {Component, Input, OnInit} from '@angular/core';
import {Device} from '@app/playlist/types/device';

@Component({
  selector: 'nbx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() device: Device;

  constructor() { }

  ngOnInit() {
  }

}
