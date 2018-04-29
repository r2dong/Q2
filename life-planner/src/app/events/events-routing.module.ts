import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AuthGuard } from '../core/auth.guard';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import {SelectEventComponent} from './select-event/select-event.component';

export const routes: Routes = [
  { path: '', component: EventsComponent , canActivate: [AuthGuard] },
  { path: 'add', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: ':eid', component: EventDetailComponent, canActivate: [AuthGuard] },

  { path: 'edit/:eid', component: EditEventComponent, canActivate: [AuthGuard] },
  { path: 'add/:pid', component: AddEventComponent, canActivate: [AuthGuard] },
  {path: 'select/:pid', component: SelectEventComponent, canActivate: [AuthGuard]},
  { path: ':eid/:pid', component: EventDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EventsRoutingModule {
}
