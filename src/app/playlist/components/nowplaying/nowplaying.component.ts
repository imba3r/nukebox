import {Component, Input, OnInit} from '@angular/core';
import {Song} from '@app/playlist/types/song';

@Component({
  selector: 'nbx-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowplayingComponent implements OnInit {

  @Input() song: Song;

  constructor() { }

  ngOnInit() {
  }

}
