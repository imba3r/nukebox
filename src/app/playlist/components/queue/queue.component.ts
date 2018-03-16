import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nbx-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  songs = ['Down by the River', 'Song2'];

  constructor() {
  }

  ngOnInit() {
  }

}
