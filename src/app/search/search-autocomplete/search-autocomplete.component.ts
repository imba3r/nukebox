import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Album, Artist, Track} from '@app/types';

@Component({
  selector: 'nbx-search-autocomplete',
  templateUrl: './search-autocomplete.component.html'
})
export class SearchAutocompleteComponent implements OnInit {

  album: FormControl;
  artist: FormControl;
  playlist: FormControl;
  filterCtrl: FormControl;
  search: FormControl;

  titles: Observable<Track[]>;

  constructor() {
  }

  ngOnInit() {

    this.album = new FormControl();
    this.artist = new FormControl();
    this.playlist = new FormControl();

    this.search = new FormControl();
    this.filterCtrl = new FormControl();


    this.titles = this.search.valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val)
        })
      );
  }

  filter(val: string): Observable<Track[]> {

    // dummy data
    return of([
      {
        album: this.createDummyAlbum(),
        artists: [this.createDummyArtist()],
        available_markets: null,
        disc_number: 4,
        duration_ms: 160000,
        explicit: false,
        href: '',
        id: '1',
        name: 'Song No 1',
        popularity: 4,
        preview_url: '',
        track_number: 0,
        type: '',
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
      },
      {
        album: this.createDummyAlbum(),
        artists: [this.createDummyArtist()],
        available_markets: null,
        disc_number: 9,
        duration_ms: 360000,
        explicit: false,
        href: '',
        id: '1',
        name: 'Song No 2',
        popularity: 7,
        preview_url: '',
        track_number: 6,
        type: '',
        uri: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
      },
    ]);

    // TODO make a call with the search params
  }

  createDummyAlbum(): Album {
    return {
      album_type: '',
      artists: null,
      available_markets: null,
      href: '',
      id: '',
      images: null,
      name: 'Super cool album',
      release_date: '',
      release_date_precision: '',
      type: '',
      uri: '',
    }
  }

  createDummyArtist(): Artist {
    return {
      href: '',
      id: '',
      name: 'Bob',
      type: '',
      uri: ''
    }
  }
}
