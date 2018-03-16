import {Component, OnInit} from '@angular/core';
import {Song} from '@app/playlist/types/song';
import {Device} from '@app/playlist/types/device';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentsong$: Observable<Song>;
  device$: Observable<Device>;
  queue$: Observable<Array<Song>>;

  constructor() {
    this.currentsong$ = PlaylistService.getCurrentSong();

    this.device$ = PlaylistService.getDevice();

    this.queue$ = PlaylistService.getQueue();
  }

  ngOnInit() {
  }

}
