import {Component, OnInit} from '@angular/core';
import {Device} from '@app/playlist/types/device';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Observable} from 'rxjs/Observable';
import {Track} from '@app/types/spotify/track-simplified.interface';
import { SessionService } from '@app/services/session.service';
import { SearchService } from '@app/search.service';
import { first, map } from 'rxjs/operators';
import { FireStoreTrack } from '@app/types';

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentTrack$: Observable<Track>;
  device$: Observable<Device>;
  queue$: Observable<Array<Track>>;

  tracks = [];

  constructor(private sessionService: SessionService,
              public searchService: SearchService) {
    this.currentTrack$ = PlaylistService.getCurrentTrack();
    this.device$ = PlaylistService.getDevice();
    this.queue$ = PlaylistService.getQueue();

    this.sessionService.addToPlaylist({trackId: '2DC4w5CmVFGr0YG56BwLKg'});
    this.sessionService.getPlaylist().pipe(first())
      .subscribe((v: FireStoreTrack[]) => v.forEach(track => {
        this.searchService.fetch(track).subscribe(t => {
          this.tracks.push({...t, votes: track.votes});
          this.tracks = [...this.tracks];
        });
      }));
  }

  ngOnInit() {
  }

}
