import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {Location} from '@angular/common';


import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import {AppRoutingModule} from '../../app-routing.module';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {TasksModule} from '../tasks.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';

import {TaskService} from '../task.service';
import {TaskModel, TaskWeight} from '../task.model';

// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { AddTaskComponent } from './add-task.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'


import {By} from '@angular/platform-browser';
import {ProjectService} from '../../projects/project.service';


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let service: TaskService;
  let fixture: ComponentFixture<AddTaskComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyService: jasmine.Spy;
  let loc: Location;


  beforeEach(() => {
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
        {provide: APP_BASE_HREF, useValue: '/tasks'},
        TaskService,
        ProjectService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });


  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TaskService);
    loc = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should create a task', () => {
    const location = fixture.debugElement.injector.get(Location);
    const task: TaskModel = {
      tid: '',
      name: '',
      hours: 0,
      urgent: false,
      important: false,
      dueDateTime: null,
      isComplete: false,
      weight: TaskWeight.NONE
    };
    spyService = spyOn(service, 'addTask').and.returnValue('TestAccount');
    service.addTask(task);
    // Check internal function
    expect(spyService).toHaveBeenCalled();


  });


});

