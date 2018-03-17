import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterClientComponent} from '@app/master-client/master-client/master-client.component';
import {Oauth2Service} from '@app/oauth2.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import {MasterPlaylistService} from '@app/master-client/service/master-playlist-service';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ClientComponent} from '@app/master-client/client.component';
import {FormsModule} from '@angular/forms';
import {SessionService} from '@app/services/session.service';

@NgModule({
  exports: [
    MasterClientComponent,
    ClientComponent
  ],
  imports: [
    FormsModule,
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
  declarations: [MasterClientComponent, LoginCallbackComponent, ClientComponent],
  providers: [MasterPlaylistService]
})
export class MasterClientModule { }
