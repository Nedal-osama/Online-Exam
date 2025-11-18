import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/routes/auth.routes';
import { mainRoutes } from './features/main/routes/main.routes';


export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'main',
    children: mainRoutes,
  },
{ path: '', redirectTo: 'main/home', pathMatch: 'full' },
{ path: '**', redirectTo: 'main/home', pathMatch: 'full' },

];
