import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/auth.guard';
import {EditTaskComponent} from './tasks/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', component: WelcomeComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'task/add', component: AddTaskComponent, canActivate: [AuthGuard]
  },
  {
    path: 'task/:tid', component: TaskDetailsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'task/edit/:tid', component: EditTaskComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
