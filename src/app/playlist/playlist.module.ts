import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaylistComponent} from '@app/playlist/components/playlist.component';
import { NowplayingComponent } from './components/nowplaying/nowplaying.component';
import { QueueComponent } from './components/queue/queue.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule,
  MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule, MatChipsModule
} from '@angular/material';
import { HeaderComponent } from './components/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AddsongComponent } from './components/addsong/addsong.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatChipsModule
  ],
  declarations: [
    PlaylistComponent,
    NowplayingComponent,
    QueueComponent,
    HeaderComponent,
    AddsongComponent,
  ],
  exports: [
    PlaylistComponent
  ]
})
export class PlaylistModule { }
