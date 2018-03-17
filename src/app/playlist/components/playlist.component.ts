import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Observable} from 'rxjs/Observable';
import {Track} from '@app/types/spotify/track-simplified.interface';
import {of} from 'rxjs/observable/of';
import {FireStoreTrack} from '@app/types';
import {SessionService} from '@app/services/session.service';

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentTrack$: Observable<Track>;
  queue$: Observable<Array<Track>>;

  users$: Observable<Array<string>>;
  masterUser$: Observable<string>;

  constructor(private sessionService: SessionService) {
    this.currentTrack$ = PlaylistService.getCurrentTrack();

    this.queue$ = PlaylistService.getQueue(this.sessionService.getPlaylist());

    this.users$ = sessionService.getUsers();

    this.masterUser$ = sessionService.getMasterUser();
  }

  ngOnInit() {
  }

  getQueue() {
    let firebasePlaylist$: Observable<FireStoreTrack[]>;

    firebasePlaylist$ = of([{
      trackId: '1',
      dateAdded: 'today'
    }, {
      trackId: '2',
      dateAdded: 'today'
    }]);

    // firebasePlaylist$.subscribe(fireStoreTrack => this.getSpotifyTrack(fireStoreTrack.trackId));

  }

}
