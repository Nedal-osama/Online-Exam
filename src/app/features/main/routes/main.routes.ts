import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';


export const mainRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
    ],
  },
];
