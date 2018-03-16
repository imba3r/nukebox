import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { AdditionalFiltersComponent } from './additional-filters/additional-filters.component';
import { SearchAutocompleteComponent } from './search-autocomplete/search-autocomplete.component';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
  ],
  declarations: [
    AdditionalFiltersComponent,
    SearchAutocompleteComponent,
    SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {
}
