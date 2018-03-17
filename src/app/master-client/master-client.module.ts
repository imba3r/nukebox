import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterClientComponent} from '@app/master-client/master-client/master-client.component';
import {Oauth2Service} from '@app/oauth2.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import {MasterPlaylistService} from '@app/master-client/service/master-playlist-service';

@NgModule({
  exports: [
    MasterClientComponent
  ],
  imports: [
    CommonModule,

  ],
  declarations: [MasterClientComponent, LoginCallbackComponent],
  providers: [MasterPlaylistService]
})
export class MasterClientModule { }
