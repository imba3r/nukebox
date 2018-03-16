import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
