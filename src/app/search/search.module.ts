import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatInputModule,
  MatSlideToggleModule
} from '@angular/material';

import {SearchAutocompleteComponent} from './search-autocomplete/search-autocomplete.component';
import {SearchComponent} from './search.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchService } from '@app/search/search.service';
import { HttpClientModule } from '@angular/common/http';
import {SnotifyService} from 'ng-snotify';
import {ToastDefaults} from 'ng-snotify';
import {SnotifyModule} from 'ng-snotify';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    SnotifyModule
  ],
  declarations: [
    SearchAutocompleteComponent,
    SearchComponent
  ],
  providers: [
    SearchService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {
}
