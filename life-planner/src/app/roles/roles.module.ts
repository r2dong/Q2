import {NgModule} from '@angular/core';

import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {RoleDetailComponent} from './role-detail/role-detail.component';
import {AddRoleComponent} from './add-role/add-role.component';
import {EditRoleComponent} from './edit-role/edit-role.component';
import {SharedModule} from '../shared/shared.module';
import {RoleService} from './role.service';
import {ShowRolesComponent} from './show-roles/show-roles.component';
import {SelectRoleComponent} from './select-role/select-role.component';

@NgModule({
  imports: [
    RolesRoutingModule,
    SharedModule
  ],
  declarations: [
    RolesComponent,
    RoleDetailComponent,
    AddRoleComponent,
    EditRoleComponent,
    ShowRolesComponent,
    SelectRoleComponent
  ],
  providers: [
    RoleService
  ],
  exports: [
    SharedModule,
    RolesComponent,
    RoleDetailComponent,
    AddRoleComponent,
    EditRoleComponent,
    ShowRolesComponent,
    SelectRoleComponent
  ]
})
export class RolesModule {
}
