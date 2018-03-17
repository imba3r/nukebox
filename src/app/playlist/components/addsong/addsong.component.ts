import {Component, Input, OnInit, Output} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';

@Component({
  selector: 'nbx-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.scss']
})
export class AddsongComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }

  addSong(trackId) {
      PlaylistService.addSong(trackId);
  }
}
