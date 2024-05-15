import { Routes } from '@angular/router';
import { AdminScreenComponent } from './user/admin/admin-screen/admin-screen.component';
import { UserScreenComponent } from './user/user-screen/user-screen.component';
import { AdminScreenManageComponent } from './user/admin/admin-screen-manage/admin-screen-manage.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: UserScreenComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-screen',
    component: AdminScreenComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-screen/manage',
    component: AdminScreenManageComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-screen/manage/:id',
    component: AdminScreenManageComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-login',
    component: UserLoginComponent,
    pathMatch: 'full'
  }
];
