import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {FireStoreTrack, Track} from '@app/types';
import { SessionService } from '@app/services/session.service';
import {toFireStoreTrack} from "@app/NukeboxUtils";

@Component({
  selector: 'nbx-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() queue: Array<FireStoreTrack>;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  voteUp(track: FireStoreTrack) {
    this.sessionService.upvoteTrack(track, 1);
  }

  voteDown(track: FireStoreTrack) {
    this.sessionService.upvoteTrack(track, -1);
  }
}
