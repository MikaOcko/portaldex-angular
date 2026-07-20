import type { Route } from '@angular/router';
import { Episodes } from './episodes';

export const EPISODES_ROUTES: Route[] = [
  {
    path: '',
    component: Episodes,
  },
];