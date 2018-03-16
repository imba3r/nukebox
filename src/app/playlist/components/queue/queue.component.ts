import {Component, Input, OnInit} from '@angular/core';
import {PlaylistService} from '@app/playlist/services/playlist.service';
import {Track} from '@app/types';

@Component({
  selector: 'nbx-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() queue: Array<Track>;

  constructor() {
  }

  ngOnInit() {
  }

  voteUp(trackId) {
    PlaylistService.voteUp(trackId);
  }

  voteDown(trackId) {
    PlaylistService.voteDown(trackId);
  }
}
