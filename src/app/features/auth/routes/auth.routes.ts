import { Routes } from '@angular/router';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';


export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgotpassword', component: ForgotpasswordComponent, title: 'Forgot Password' },
    ],
  },
];
