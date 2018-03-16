import {Component, OnInit} from '@angular/core';
import {Song} from '@app/playlist/types/song';
import {Device} from '@app/playlist/types/device';

@Component({
  selector: 'nbx-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  currentsong: Song;
  device: Device;
  queue: Array<Song>;

  constructor() {
    this.currentsong = {
      title: 'Surfing on Las Palmas',
      artist: 'DJ Dutch Guy',
      image: '',
      votes: 4
    };

    this.device = {
      name: 'Nikolas boombox'
    };

    this.queue = [];
    this.queue.push({
      title: 'Next song',
      artist: 'artist',
      image: '',
      votes: 3
    });
    this.queue.push({
      title: 'Another one',
      artist: 'artist',
      image: '',
      votes: 2
    });
    this.queue.push({
      title: 'Song',
      artist: 'artist',
      image: '',
      votes: 2
    });
  }

  ngOnInit() {
  }

}
