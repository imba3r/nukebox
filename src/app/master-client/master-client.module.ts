import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MasterClientComponent} from '@app/master-client/master-client/master-client.component';
import {Oauth2Service} from '@app/oauth2.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

@NgModule({
  exports: [
    MasterClientComponent
  ],
  imports: [
    CommonModule,

  ],
  declarations: [MasterClientComponent, LoginCallbackComponent],
  providers: []
})
export class MasterClientModule { }
