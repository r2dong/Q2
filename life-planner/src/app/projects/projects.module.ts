import { NgModule } from '@angular/core';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectService } from './project.service';

@NgModule({
  imports: [
    ProjectsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    AddProjectComponent,
    EditProjectComponent
  ],
  providers: [
    ProjectService
  ],
  exports: [
    ProjectsComponent,
    ProjectDetailComponent,
    AddProjectComponent,
    EditProjectComponent
  ]
})
export class ProjectsModule {
}
