import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';
import {Artist} from '@app/types/spotify/artist.interface';
import {Album} from '@app/types/spotify/album-simplified.interface';
import {Image} from '@app/types/spotify/image.interface';

@Injectable()
export class PlaylistService {

  constructor() {
  }

  static voteUp(trackId: any) {
    // fixme or index as argument?
    console.log('voteUp ' + trackId);
  }

  static voteDown(trackId: any) {
    // fixme or index as argument?
    console.log('voteDown ' + trackId);
  }

  static addSong(trackId: string) {
    // fixme
    console.log('addSong ' + trackId);
  }

  static getQueue() {
    return of([this.getDummyTrack(), this.getDummyTrack()]);
  }

  static getDevice() {
    return of({
      name: 'The Nukebox'
    });
  }

  static getCurrentTrack() {
    return of(this.getDummyTrack());
  }

  private static getDummyAlbum() {
    return {
      album_type: '',
      artists: [this.getDummyArtist()],
      available_markets: [],
      href: '',
      id: '12342d',
      images: [],
      name: 'Album title',
      release_date: '',
      release_date_precision: '',
      type: '',
      uri: ''
    };
  }

  private static getDummyArtist() {
    return {
      href: '',
      id: 'jsjdafhjkf',
      name: 'DJ Chris',
      type: '',
      uri: ''
    };
  }

  private static getDummyTrack() {
    return {
      album: this.getDummyAlbum(),
      artists: [this.getDummyArtist()],
      available_markets: [],
      disc_number: 1,
      duration_ms: 2000,
      explicit: false,
      href: '',
      id: '123',
      name: 'dummy song',
      popularity: 10,
      preview_url: '',
      track_number: 2,
      type: '',
      uri: ''
    };
  }
}
