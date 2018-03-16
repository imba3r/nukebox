import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { environment } from '@env/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {MasterClientModule} from '@app/master-client/master-client.module';
import {MasterClientComponent} from '@app/master-client/master-client/master-client.component';
import {LoginCallbackComponent} from '@app/master-client/login-callback/login-callback.component';
import {Oauth2Service} from '@app/oauth2.service';

export const ROUTES = [
  { path: '', component: MasterClientComponent },
  { path: 'master', component: MasterClientComponent },
  { path: 'master/login/success', component: LoginCallbackComponent },
  { path: '**', redirectTo: '' },
];
import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MasterClientModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [Oauth2Service],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
