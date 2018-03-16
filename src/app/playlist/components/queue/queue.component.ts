import {Component, Input, OnInit} from '@angular/core';
import {Song} from '@app/playlist/types/song';

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

}
