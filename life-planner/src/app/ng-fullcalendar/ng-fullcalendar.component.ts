import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SchedulingService } from '../core/scheduling.service'
import { TimeSlot, TaskModel } from '../tasks/task.model'
import { Router } from '@angular/router'
import { RoleService } from '../roles/role.service'

interface Item {
  title: String
  start: String
  end: String
}

interface CalendarSlot {
  title: String
  id: String
  start: String
  end: String
  color?: String
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

  constructor(
    private scheduling: SchedulingService,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit() {
    this.calendarSlots = []
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
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
          if (task.rid != undefined) {
            this.roleService.getRole(task.rid).subscribe((role) => {
              this.calendarSlots.push({
                title: task.name,
                id: task.tid,
                start: slot.start.toLocaleString(),
                end: slot.end.toLocaleString(),
                color: role.color
              })
              this.drawEvents()
            })
          }
          else {
            this.calendarSlots.push({
              title: task.name,
              id: task.tid,
              start: slot.start.toLocaleString(),
              end: slot.end.toLocaleString(),
              color: 'undefined'
            })
            this.drawEvents()
          }
        });
      })

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

  eventClick(arg) {
    this.router.navigateByUrl('/tasks/' + arg.event.id)
  }
}