import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {GoalsComponent} from './goals.component';
import {AddGoalComponent} from './add-goal/add-goal.component';
import {EditGoalComponent} from './edit-goal/edit-goal.component';
import { AuthGuard } from '../core/auth.guard';
import {GoalDetailComponent} from './goal-detail/goal-detail.component';


export const routes: Routes = [
  { path: '', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddGoalComponent, canActivate: [AuthGuard] },
  { path: ':gid', component: GoalDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:gid', component: EditGoalComponent, canActivate: [AuthGuard] }
  // { path: 'add/:pid', component: AddGoalComponent, canActivate: [AuthGuard] },
 // { path: ':gid/:pid', component: GoalDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GoalsRoutingModule {
}
