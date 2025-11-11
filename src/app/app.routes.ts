import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/auth/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { ForgotpasswordComponent } from './core/auth/components/forgotpassword/forgotpassword.component';
import { MainLayoutComponent } from './core/auth/layouts/main-layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgotpassword', component: ForgotpasswordComponent, title: 'Forgot Password' },
    ],
  },
  {
    path: 'main',
    component: MainLayoutComponent,
    children: [{ path: 'home', component: HomeComponent, title: 'Home' }],
  },
{ path: '', redirectTo: 'main/home', pathMatch: 'full' },
{ path: '**', redirectTo: 'main/home', pathMatch: 'full' },

];
