import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { concatMap, debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Track } from '@app/types';
import { SearchService } from '@app/search/search.service';
import { PlaylistService } from '@app/playlist/services/playlist.service';

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

  constructor(private searchService: SearchService) {
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
        tap(v => console.log(v)),
        concatMap(val => val ? this.searchService.search(val) : of()),
      );
  }

  addTitleToPlaylist() {
    console.log(this.search);
    PlaylistService.addSong('');
  }
}
