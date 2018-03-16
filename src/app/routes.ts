import {LoginCallbackComponent} from '@app/master-client/login-callback/login-callback.component';
import {MasterClientComponent} from '@app/master-client/master-client/master-client.component';
import {AppComponent} from '@app/app.component';
import {ClientComponent} from '@app/client/client.component';

export const ROUTES = [
  { path: '', component: ClientComponent },
  { path: 'master/login', component: MasterClientComponent },
  { path: 'master/login/success', component: LoginCallbackComponent },
  { path: '**', redirectTo: '' },
];
