import { SchedulingService } from './scheduling.service'
import { TaskService } from '../tasks/task.service'
import { TestBed, inject } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { APP_BASE_HREF } from '@angular/common'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AppRoutingModule } from '../app-routing.module'
import 'rxjs/add/operator/switchMap'
import { User } from './user.model'
import { AuthService } from './auth.service'
import { AngularFireModule } from 'angularfire2'
import { environment } from '../../environments/environment'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppComponent } from '../app.component'
import { LoginComponent } from '../login/login.component'
import { HomeComponent } from '../home/home.component'
import { WelcomeComponent } from '../welcome/welcome.component'
import { NotFoundComponent } from '../not-found/not-found.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { Observable } from 'rxjs/Observable'
import { CalendarComponent } from 'ng-fullcalendar';
import { NgFullcalendarComponent } from '../ng-fullcalendar/ng-fullcalendar.component'
import { ProjectService } from '../projects/project.service'

// test stub task lists
import * as taskLists from '../../testing/dummyTasks'
import { TaskModel } from '../tasks/task.model'
import { hourVal } from './scheduling.service'
import { TimeSlot } from '../tasks/task.model'

let taskService: TaskService

/* check if a date is between 9am and 5pm */
let isDayTime = function(date: Date): boolean {
  if (date.getHours() < 9 || date.getHours() > 17 || date.getHours() == 17 &&
      (
        date.getMinutes() != 0 ||
        date.getSeconds() != 0 ||
        date.getMilliseconds() != 0
      )
    )
    return false
  else
    return true
}

/* given list of time slots, check if another overlaps with any */
let isNotOverlap = function (allSlots: TimeSlot[], toCheck: TimeSlot): boolean {
  for (let i: number = 0; i < allSlots.length; i++)
    if (toCheck.start <= allSlots[i].start && toCheck.end > allSlots[i].start ||
        toCheck.start < allSlots[i].end && toCheck.end >= allSlots[i].end)
          return false
  return true
}

/* assumes that no duplicate tasks exist */
let isValidSchedule = function (input: TaskModel[], output: TaskModel[]): boolean {
  /* implement check of no overlapping, keep a list of all time slots, check new time
  slots with ones already in there, and the append the new one */
  if (input.length != output.length)
    throw "not all tasks scheduled, should have: " + input.length + ", but got " + output.length
  let errThresh = .01
  let allSlots: TimeSlot[] = []
  output.forEach((task, tInd, tArr) => {
    let sum = 0
    task.schedule.forEach((slot, sInd, sArr) => {
      if (slot.end <= slot.start)
        throw "invalid time slot! " + 
              "task name: " + task.name +
              "start: " + slot.start.toLocaleString() + 
              ", end: " + slot.end.toLocaleString()
      if (task.dueDateTime != undefined)
        if (slot.end > task.dueDateTime)
          throw "task overdue!"
      if (!isDayTime(slot.start) || !isDayTime(slot.end))
        throw "not during day! " +
              "task name: " + task.name +
              "start: " + slot.start.toLocaleString() + 
              ", end: " + slot.end.toLocaleString()
      if (!isNotOverlap(allSlots, slot))
        throw "overlapping time slots!"
      allSlots.push(slot)
      sum += slot.end.valueOf() - slot.start.valueOf()
    })
    if ((hourVal * task.hours - sum) / sum > errThresh)
      throw "task incomplete!"
  })
  return true
}

describe('SchedulingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule,
        FlashMessagesModule
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        CalendarComponent,
        NgFullcalendarComponent
      ],
      providers: [
        SchedulingService,
        TaskService,
        { provide: APP_BASE_HREF, useValue: '/core'},
        AuthService,
        ProjectService
      ],
    });
    taskService = TestBed.get(TaskService)
  });

  it('should be created', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('original dummyTasks', inject([SchedulingService], (service: SchedulingService) => {
    spyOn(taskService, "getTasks").and.returnValue(Observable.of(taskLists.dummyTasks))
    service.createSchedule().subscribe((schedule) => {
      expect(isValidSchedule(taskLists.dummyTasks, schedule)).toBeTruthy()
    })
  }));

  it('empty task list', inject([SchedulingService], (service: SchedulingService) => {
    spyOn(taskService, "getTasks").and.returnValue(Observable.of(taskLists.emptyTaskList))
    service.createSchedule().subscribe((schedule) => {
      expect(isValidSchedule(taskLists.emptyTaskList, schedule)).toBeTruthy()
    })
  }));

  it('all tasks have no due date', inject([SchedulingService], (service: SchedulingService) => {
    spyOn(taskService, "getTasks").and.returnValue(Observable.of(taskLists.noDueTaskList))
    service.createSchedule().subscribe((schedule) => {
      expect(isValidSchedule(taskLists.noDueTaskList, schedule)).toBeTruthy()
    })
  }));

  it('all tasks have zero hours and no due date', inject([SchedulingService], (service: SchedulingService) => {
    spyOn(taskService, "getTasks").and.returnValue(Observable.of(taskLists.zeroHoursNoDueTasks))
    service.createSchedule().subscribe((schedule) => {
      expect(isValidSchedule(taskLists.zeroHoursNoDueTasks, schedule)).toBeTruthy()
    })
  }));
});
