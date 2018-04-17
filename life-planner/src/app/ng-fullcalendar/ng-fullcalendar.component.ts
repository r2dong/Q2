import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-ng-fullcalendar',
  templateUrl: './ng-fullcalendar.component.html',
})

export class NgFullcalendarComponent implements OnInit {
  
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  
  constructor() { }
  
  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: undefined
    };
  }

  public test() {
    let el = {
      title: 'New event',
      start: '2018-04-16',
      end: '2018-04-18',
    }
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
    console.log("test function is called")
  }
}