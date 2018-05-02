import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { SchedulingService } from '../core/scheduling.service'
import { TimeSlot, TaskModel } from '../tasks/task.model'
import { Router } from '@angular/router'
import { RoleService } from '../roles/role.service'
import { DefaultViewService } from './default-view.service'

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
  defaultView: String
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent

  /* to fix testing issue "can't bind to ..." */
  @Input("options") options: Options;

  constructor(
    private scheduling: SchedulingService,
    private router: Router,
    private roleService: RoleService,
    private defaultViewService: DefaultViewService
  ) { }

  ngOnInit() {
    this.calendarSlots = []
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      defaultView: this.defaultViewService.getDefaultView(),
      defaultDate: this.defaultViewService.getDefaultDate(),
      header: {
        left: 'prev next today',
        center: 'title',
        right: 'month, agendaWeek, agendaDay, listMonth'
      },
      events: []
    }
    this.updateCalendar()
  }
  
  updateCalendar() {
    this.scheduling.createSchedule().subscribe((schedule: TaskModel[]) => {
      this.calendarSlots = []
      schedule.forEach((task: TaskModel) => {
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
          }
        });
      })
    })
  }

  clickButton(arg): void {

  }

  eventClick(arg): void {
    this.router.navigateByUrl('/tasks/' + arg.event.id)
  }

  viewRender(arg): void {
    let view = this.ucCalendar.fullCalendar('getView')
    let date = this.ucCalendar.fullCalendar('getDate')
    console.log(date)
    this.defaultViewService.setDefaultView(view.name)
    this.defaultViewService.setDefaultDate(date)
  }
}