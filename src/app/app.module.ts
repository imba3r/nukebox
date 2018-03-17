import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '@env/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';


import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {MasterClientModule} from '@app/master-client/master-client.module';
import {Oauth2Service} from '@app/oauth2.service';
import {SessionService} from './services/session.service';
import {ROUTES} from '@app/routes';
import {ClientComponent} from './master-client/client.component';
import {PlaylistModule} from '@app/playlist/playlist.module';
import {SearchModule} from './search/search.module';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material';
import { SearchService } from '@app/search.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MasterClientModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
    BrowserModule,
    SearchModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    PlaylistModule
  ],
  providers: [Oauth2Service, SessionService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
