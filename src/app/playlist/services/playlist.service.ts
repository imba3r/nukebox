import { Injectable } from '@angular/core';
import {of} from 'rxjs/observable/of';

@Injectable()
export class PlaylistService {

  constructor() { }

  static voteUp(songId: any) {
    // fixme
    console.log('voteUp ' + songId);
  }

  static voteDown(songId: any) {
    // fixme
    console.log('voteDown ' + songId);
  }

  static addSong(trackId: string) {
    // fixme
    console.log('addSong ' + trackId);
  }

  static getQueue() {
    return of([{
      id: '1',
      title: 'Next song',
      artist: 'artist',
      image: '',
      votes: 3
    }, {
      id: '2',
      title: 'Another one',
      artist: 'artist',
      image: '',
      votes: 2
    }, {
      id: '3',
      title: 'Song',
      artist: 'artist',
      image: '',
      votes: 2
    }]);
  }

  static getCurrentSong() {
    return of({
      id: '12jfdskfbk',
      title: 'Surfing on Las Palmas',
      artist: 'DJ Dutch Guy',
      image: '',
      votes: 4
    });
  }

  static getDevice() {
    return of({
      name: 'Nikolas boombox'
    });
  }
}
