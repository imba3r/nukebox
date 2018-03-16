import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {PlaylistModule} from '@app/playlist/playlist.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlaylistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
