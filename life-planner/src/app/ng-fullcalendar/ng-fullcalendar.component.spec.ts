import { ComponentFixture, async, TestBed } from '@angular/core/testing';

import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {By} from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Components
import {AppComponent} from '../app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthService } from '../core/auth.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs/Observable';
import { NgFullcalendarComponent } from './ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'
import { TaskService } from '../tasks/task.service';
import { ProjectService } from '../projects/project.service';
import { Options } from 'fullcalendar';
import { RoleService } from '../roles/role.service';
import { DefaultViewService } from './default-view.service';
import { TaskModel } from '../tasks/task.model'
import * as stubTasks from '../../testing/dummyTasks'

// stubs
class TaskServiceStub {
  getTasks(): Observable<TaskModel[]> {
    return Observable.of(stubTasks.dummyTasks)
  }
}

describe('NgFullcalendarComponent', () => {
  let component: NgFullcalendarComponent;
  let fixture: ComponentFixture<NgFullcalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
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
        NgFullcalendarComponent,
        CalendarComponent
       ],
       providers: [
        { provide: APP_BASE_HREF, useValue: '/ng-fullcalendar'},
        { provide: TaskService, useClass: TaskServiceStub },
        ProjectService,
        RoleService,
        DefaultViewService,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFullcalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have schedules rendered when entering component', () => {
    expect(component.calendarOptions).toBeDefined()
  })

  it('should initilize to default view provided by defaultViewService', () => {
    let s: DefaultViewService = TestBed.get(DefaultViewService)
    spyOn(s, "getDefaultView").and.returnValue('agendaWeek')
    expect(component.calendarOptions.defaultView).toEqual('agendaWeek')
  })
});
