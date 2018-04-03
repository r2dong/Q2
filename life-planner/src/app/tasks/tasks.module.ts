import { NgModule } from '@angular/core';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SharedModule } from '../shared/shared.module';
import { TaskService } from './task.service';

@NgModule({
  imports: [
    TasksRoutingModule,
    SharedModule
  ],
  declarations: [
    TasksComponent,
    TaskDetailComponent,
    AddTaskComponent,
    EditTaskComponent
  ],
  providers: [
    TaskService
  ],
  exports: [
    SharedModule,
    TasksComponent,
    TaskDetailComponent,
    AddTaskComponent,
    EditTaskComponent
  ]
})
export class TasksModule {
}
