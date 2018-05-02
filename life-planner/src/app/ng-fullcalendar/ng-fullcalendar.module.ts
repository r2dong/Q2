import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'ng-fullcalendar';
import { BrowserModule } from '@angular/platform-browser';
import { NgFullcalendarComponent } from './ng-fullcalendar.component';
import { DefaultViewService } from './default-view.service';
 
@NgModule({
  imports: [
    BrowserModule,
    FullCalendarModule,
  ],
  declarations: [
    NgFullcalendarComponent
  ],
  providers: [
    DefaultViewService
  ]
})
export class NgFullcalendarModule { }
