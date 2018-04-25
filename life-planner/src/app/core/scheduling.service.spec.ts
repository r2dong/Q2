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
import { ScheduleComponent } from '../schedule/schedule.component'
import { CalendarComponent } from 'ng-fullcalendar';
import { NgFullcalendarComponent } from '../ng-fullcalendar/ng-fullcalendar.component'
import { ProjectService } from '../projects/project.service'

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
        ScheduleComponent,
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
  });

  it('should be created', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should not break with empty task litst', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should not break if all tasks have no due date', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should not break if all tasks have no weight', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should schedule urgent and important tasks to finish right on time', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should schedule all tasks', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should schedule tasks only during daytime', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

  it('should allow no multi-tasking', inject([SchedulingService], (service: SchedulingService) => {
    expect(service).toBeTruthy();
  }));

});
