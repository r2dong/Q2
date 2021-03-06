import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RolesComponent} from './roles.component';
import {RoleDetailComponent} from './role-detail/role-detail.component';
import {AuthGuard} from '../core/auth.guard';
import {AddRoleComponent} from './add-role/add-role.component';
import {EditRoleComponent} from './edit-role/edit-role.component';
import {SelectRoleComponent} from './select-role/select-role.component';

export const routes: Routes = [
  {path: '', component: RolesComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddRoleComponent, canActivate: [AuthGuard]},
  {path: ':rid', component: RoleDetailComponent, canActivate: [AuthGuard]},
  {path: 'edit/:rid', component: EditRoleComponent, canActivate: [AuthGuard]},
  {path: 'select/:tid', component: SelectRoleComponent, canActivate: [AuthGuard]},
  {path: 'add/:tid', component: AddRoleComponent, canActivate: [AuthGuard]},
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
