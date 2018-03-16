import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { HeaderComponent } from './playlist/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
