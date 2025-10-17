import { Route } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './components/user-dashboard/user-form.component';
import { authGuard } from './state/user/auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'add-user', component: UserFormComponent, canActivate: [authGuard] },
  { path: 'edit-user/:id', component: UserFormComponent, canActivate: [authGuard] },
];
