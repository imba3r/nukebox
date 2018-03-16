import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Album, Artist, Track} from '@app/types';
import {SearchService} from '@app/search/search.service';

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
        switchMap(val => {
          return val ? this.filter(val) : of();
        })
      );
  }

  filter(val: string): Observable<Track[]> {
    return this.searchService.search(val);
  }
}
