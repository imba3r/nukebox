import {Component, OnInit} from '@angular/core';
import {Device} from '@app/playlist/types/device';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Observable} from 'rxjs/Observable';
import {Track} from '@app/types/spotify/track-simplified.interface';
import {SessionService} from '@app/services/session.service';
import {SearchService} from '@app/search.service';
import {first, map, merge, mergeMap, reduce, switchMap, tap, toArray} from 'rxjs/operators';
import {FireStoreTrack} from '@app/types';
import {of} from 'rxjs/observable/of';
import {identity} from "rxjs/util/identity";
import {toFireStoreTrack} from "@app/NukeboxUtils";
import {from} from "rxjs/observable/from";

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentTrack$: Observable<Track>;
  device$: Observable<Device>;

  tracks$: Observable<Array<FireStoreTrack>>;

  constructor(private sessionService: SessionService,
              public searchService: SearchService) {
    this.currentTrack$ = PlaylistService.getCurrentTrack();
    this.device$ = PlaylistService.getDevice();


  }

  ngOnInit() {
    this.tracks$ = this.sessionService.getPlaylist();
  }

}
