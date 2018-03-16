import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '@env/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SessionService } from '@app/services/session.service';

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
