import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('./restaurants/routes').then((m) => m.RESTAURANT_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
