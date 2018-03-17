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
    MatSlideToggleModule
  ],
  declarations: [
    SearchAutocompleteComponent,
    SearchComponent
  ],
  providers: [
    SearchService,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {
}
