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
import {SearchModule} from '@app/search/search.module';
import { UsersComponent } from './components/users/users.component';
import {PlaylistService} from "@app/playlist/services/playlist.service";

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
    MatChipsModule,
    SearchModule
  ],
  declarations: [
    PlaylistComponent,
    NowplayingComponent,
    QueueComponent,
    HeaderComponent,
    AddsongComponent,
    UsersComponent
  ],
  exports: [
    PlaylistComponent
  ],
  providers: [
    PlaylistService
  ]
})
export class PlaylistModule { }
