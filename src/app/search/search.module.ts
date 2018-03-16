import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { AdditionalFiltersComponent } from './additional-filters/additional-filters.component';
import { SearchAutocompleteComponent } from './search-autocomplete/search-autocomplete.component';
import { SearchComponent } from './search.component';
import { SearchService } from '@app/search/search.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
  ],
  declarations: [
    AdditionalFiltersComponent,
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
