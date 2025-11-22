import { Routes } from '@angular/router';
import { LoginComponent } from '../modules/auth/login/login.component';
import { LayoutComponent } from '../core/layout/layout.component';
import { authGuard } from '../core/security/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'library',
    component: LayoutComponent,
    canActivate: [authGuard],
    loadChildren: () => import('../modules/library/library.routes').then(m => m.LIBRARY_ROUTES)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
