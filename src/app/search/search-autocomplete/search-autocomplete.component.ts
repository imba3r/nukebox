import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, startWith, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Track} from '@app/types';
import {SearchService} from '@app/search/search.service';
import {SnotifyService} from 'ng-snotify';
import {SessionService} from '@app/services/session.service';

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
  track: Track;

  constructor(private searchService: SearchService, private snotifyService: SnotifyService,
              private sessionService: SessionService) {
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
        switchMap(val => val ? this.searchService.search(val) : of()),
      );
  }

  addTitleToPlaylist() {
    const firebaseTrack = {
      trackId: this.track.uri
    };
    this.sessionService.addToTrackQueue(firebaseTrack);
    this.snotifyService.success('Title successfully added to the playlist.', {
      timeout: 3000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
    this.search.setValue('')
  }

  onSelect(item: Track) {
    this.track = item;
}
}
