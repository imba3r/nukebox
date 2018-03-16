import {Component, Input, OnInit} from '@angular/core';
import {Track} from '@app/types';

@Component({
  selector: 'nbx-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowplayingComponent implements OnInit {

  @Input() track: Track;

  constructor() { }

  ngOnInit() {
  }

}
