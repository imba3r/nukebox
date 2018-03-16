import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistService {

  constructor() { }

  getPlaylist() {

  }

  static voteUp(songId: any) {
    // fixme
    console.log("voteUp " + songId);
  }

  static voteDown(songId: any) {
    // fixme
    console.log("voteDown " + songId);
  }

  static addSong(trackId: string) {
    // fixme
    console.log("addSong " + trackId);
  }
}
