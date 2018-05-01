import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SchedulingService } from '../core/scheduling.service'
import { TimeSlot, TaskModel } from '../tasks/task.model'

interface Item {
  title: String
  start: String
  end: String
}

interface CalendarSlot {
  title: String
  start: String
  end: String
}

@Component({
  selector: 'app-ng-fullcalendar',
  templateUrl: './ng-fullcalendar.component.html',
})

export class NgFullcalendarComponent implements OnInit {

  schedule: TaskModel[]
  calendarSlots: CalendarSlot[]
  calendarOptions: Options
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent

  /* to fix testing issue "can't bind to ..." */
  @Input("options") options: Options;

  constructor(private scheduling: SchedulingService) { }

  ngOnInit() {
    this.calendarSlots = []
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      lazyFetching: false,
      header: {
        left: 'prev next today',
        center: 'title',
        right: 'month, agendaWeek, agendaDay, listMonth'
      },
      eventSources: [
        {
          events: this.calendarSlots,
          id: 1
        }
      ]
    };
  }

  updateCalendar() {
    this.scheduling.createSchedule().subscribe((schedule: TaskModel[]) => {
      this.schedule = schedule
      this.calendarSlots.splice(0, this.calendarSlots.length)
      this.schedule.forEach((task: TaskModel) => {
        task.schedule.forEach((slot: TimeSlot) => {
          this.calendarSlots.push({
            title: task.name,
            start: slot.start.toLocaleString(),
            end: slot.end.toLocaleString()
          })
        });
      })
      this.drawEvents()
    })
  }

  drawEvents() {
    this.ucCalendar.fullCalendar('removeEventSource', 1)
    this.ucCalendar.fullCalendar('addEventSource', { 
      id: 1, 
      events: this.calendarSlots 
    })
  }
  
  clickButton(arg) { 
    this.drawEvents()
  }
}