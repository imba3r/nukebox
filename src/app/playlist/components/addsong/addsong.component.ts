import {Component, OnInit, Output} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';

@Component({
  selector: 'nbx-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.scss']
})
export class AddsongComponent implements OnInit {
  trackId: string;

  constructor() {
    this.trackId = '12345';
  }

  ngOnInit() {
  }

  addSong() {
      PlaylistService.addSong(this.trackId);
  }
}
