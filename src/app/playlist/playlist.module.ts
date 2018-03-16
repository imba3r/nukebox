import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlaylistComponent} from '@app/playlist/components/playlist.component';
import { NowplayingComponent } from './components/nowplaying/nowplaying.component';
import { QueueComponent } from './components/queue/queue.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule,
  MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';

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
    MatToolbarModule
  ],
  declarations: [
    PlaylistComponent,
    NowplayingComponent,
    QueueComponent,
  ],
  exports: [
    PlaylistComponent
  ]
})
export class PlaylistModule { }
