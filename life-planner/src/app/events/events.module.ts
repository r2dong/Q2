import { NgModule } from '@angular/core';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { SharedModule } from '../shared/shared.module';
import { EventService } from './event.service';


@NgModule({
  imports: [
    EventsRoutingModule,
    SharedModule
  ],
  declarations: [
    EventsComponent,
    EventDetailComponent,
    AddEventComponent,
    EditEventComponent
  ],
  providers: [
    EventService
  ],
  exports: [
    EventsComponent,
    EventDetailComponent,
    AddEventComponent,
    EditEventComponent
  ]
})
export class EventsModule {
}
