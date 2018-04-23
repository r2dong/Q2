import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectRoleComponent} from './select-role.component';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {LoginComponent} from '../../login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {ProjectService} from '../../projects/project.service';
import {CoreModule} from '../../core/core.module';
import {AngularFireModule} from 'angularfire2';
import {TasksModule} from '../../tasks/tasks.module';
import {AppRoutingModule} from '../../app-routing.module';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import {WelcomeComponent} from '../../welcome/welcome.component';
import {HomeComponent} from '../../home/home.component';
import {environment} from '../../../environments/environment';
import {TaskService} from '../../tasks/task.service';
import {AppComponent} from '../../app.component';
import {NavbarComponent} from '../../navbar/navbar.component';
import {APP_BASE_HREF} from '@angular/common';
import {RolesModule} from '../roles.module';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'
import { ScheduleComponent } from '../../schedule/schedule.component'

describe('SelectRoleComponent', () => {
  let component: SelectRoleComponent;
  let fixture: ComponentFixture<SelectRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlashMessagesModule,
        FormsModule,
        SharedModule,
        TasksModule,
        CoreModule,
        RolesModule,
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        NgFullcalendarComponent,
        CalendarComponent,
        ScheduleComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/role-detail'},
        TaskService,
        ProjectService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
