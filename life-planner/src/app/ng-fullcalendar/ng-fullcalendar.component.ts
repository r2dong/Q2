import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { DummyTaskModel } from '../../testing/dummyTasks'
import { SchedulingService } from '../core/scheduling.service'

interface Item {
  title: String
  start: String
  end: String
}

// internal value of time
const hourVal: number = 
  new Date(2018, 3, 8, 10).valueOf() - 
  new Date(2018, 3, 8, 9).valueOf()
const minuteVal: number =
  new Date(2018, 3, 8, 10, 2).valueOf() - 
  new Date(2018, 3, 8, 10, 1).valueOf()
// ten minutes (1 / 6 of an hour)
const defaultWeight: number = 1 / 6

@Component({
  selector: 'app-ng-fullcalendar',
  templateUrl: './ng-fullcalendar.component.html',
})
export class NgFullcalendarComponent implements OnInit {
  
  items: DummyTaskModel[]
  calendarOptions: Options
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent
  
  constructor(private scheduling: SchedulingService) { }
  
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

  /**
   * testing interacting with calendar interface, can remove any time
   */
  test() {
    let el = {
      title: 'New event',
      start: '2018-04-16',
      end: '2018-04-18',
    }
    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
    console.log("test function is called")
  }

  /**
   * get events from scheduling service to display on calendar
   */
  getSchedule() {
    this.scheduling.createSchedule().subscribe(schedule => {
      this.items = schedule
    })
  }

  updateCalendar() {
    this.getSchedule()
    let item: Item
    for (let i: number = 0; i < this.items.length; i++) {
      item = {
        title: this.items[i].name,
        start: this.items[i].start.toLocaleString(),
        end: this.computeEndTime(this.items[i].start, this.items[i].weight).toLocaleString()
      }
      this.ucCalendar.fullCalendar('renderEvent', item);
    }
  }

  private computeEndTime(start: Date, duration: number): Date {
    let startVal: number = start.valueOf()
    let endVal: number = startVal + duration * hourVal
    return new Date(endVal)
  }
}