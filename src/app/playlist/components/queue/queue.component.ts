import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Track} from '@app/types';
import { SessionService } from '@app/services/session.service';

@Component({
  selector: 'nbx-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() queue: Array<Track>;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  voteUp(trackId) {
    this.sessionService.upvoteTrack({trackId: trackId}, 1);
    PlaylistService.voteUp(trackId);
  }

  voteDown(trackId) {
    this.sessionService.upvoteTrack({trackId: trackId}, -1);
  }
}
