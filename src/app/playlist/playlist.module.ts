import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaylistComponent} from '@app/playlist/playlist.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PlaylistComponent,
  ],
  exports: [
    PlaylistComponent
  ]
})
export class PlaylistModule { }
