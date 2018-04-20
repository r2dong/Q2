import { NgModule } from '@angular/core';
 import {GoalsRoutingModule} from './goals-routing.module';
import {GoalsComponent} from './goals.component';
// import {GoalDetailComponent}
// import {EditGoalComponent}
import {EditGoalComponent} from './edit-goal/edit-goal.component';
import {SharedModule} from '../shared/shared.module';
import {GoalService} from './goal.service';
import {AddGoalComponent} from './add-goal/add-goal.component';
import {GoalDetailComponent} from './goal-detail/goal-detail.component';


@NgModule({
  imports: [
    GoalsRoutingModule,
    SharedModule
  ],
  declarations: [
     GoalsComponent,
    GoalDetailComponent,
    AddGoalComponent,
    EditGoalComponent
  ],
  providers: [
    GoalService
  ],
  exports: [
    SharedModule,
    GoalsComponent,
    GoalDetailComponent,
    AddGoalComponent,
    EditGoalComponent
  ]
})

export class GoalsModule {

}
