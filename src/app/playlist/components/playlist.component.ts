import {Component, OnInit} from '@angular/core';
import {Device} from '@app/playlist/types/device';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Observable} from 'rxjs/Observable';
import {Track} from '@app/types/spotify/track-simplified.interface';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentTrack$: Observable<Track>;
  device$: Observable<Device>;
  queue$: Observable<Array<Track>>;

  users$: Observable<Array<string>>;
  masterUser$: Observable<string>;

  constructor() {
    this.currentTrack$ = PlaylistService.getCurrentTrack();

    this.device$ = PlaylistService.getDevice();

    this.queue$ = PlaylistService.getQueue();

    this.users$ = of(['Florian', 'Chris']);

    this.masterUser$ = of('Nicolas');
  }

  ngOnInit() {
  }

}
