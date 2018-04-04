import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AuthGuard } from '../core/auth.guard';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const routes: Routes = [
  { path: '', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: ':pid', component: ProjectDetailComponent, canActivate: [AuthGuard] },

  { path: 'edit/:pid', component: EditProjectComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule {
}
