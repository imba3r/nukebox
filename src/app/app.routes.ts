import {PlaylistComponent} from '@app/playlist/components/playlist.component';
import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: PlaylistComponent
  },
  { path: '**', redirectTo: '/' }
];
