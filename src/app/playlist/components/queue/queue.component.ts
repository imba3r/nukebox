import {Component, Input, OnInit} from '@angular/core';
import {Song} from '@app/playlist/types/song';
import {PlaylistService} from '@app/playlist/services/playlist.service';

@Component({
  selector: 'nbx-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  @Input() queue: Array<Song>;

  constructor() {
  }

  ngOnInit() {
  }

  voteUp(songId) {
    PlaylistService.voteUp(songId);
  }

  voteDown(songId) {
    PlaylistService.voteDown(songId);
  }
}
