import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { AuthGuard } from '../core/auth.guard';
import { AddRoleComponent } from './add-role/add-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';

export const routes: Routes = [
  { path: '', component: RolesComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddRoleComponent, canActivate: [AuthGuard] },
  { path: ':tid', component: RoleDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:tid', component: EditRoleComponent, canActivate: [AuthGuard] },
  { path: 'add/:pid', component: AddRoleComponent, canActivate: [AuthGuard] },
  { path: ':tid/:pid', component: RoleDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RolesRoutingModule {
}
