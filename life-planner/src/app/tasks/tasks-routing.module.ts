import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { AuthGuard } from '../core/auth.guard';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: ':tid', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:tid', component: EditTaskComponent, canActivate: [AuthGuard] },
  { path: 'add/:pid', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: ':tid/:pid', component: TaskDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule {
}
