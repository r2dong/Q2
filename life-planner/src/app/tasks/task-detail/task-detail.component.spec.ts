import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { TasksModule } from '../tasks.module';
import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import {TaskService} from '../task.service';
import {TaskModel, TaskWeight} from '../task.model';
import * as firebase from 'firebase';
// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { TaskDetailComponent } from './task-detail.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';


import { ActivatedRoute, Router, Params } from '@angular/router';


import { By } from '@angular/platform-browser';
import {ProjectService} from "../../projects/project.service";


describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let service: TaskService;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;


  // let spyService: jasmine.Spy;

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
        NavbarComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/role-detail'},
        TaskService,
        ProjectService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(TaskService);


    fixture.detectChanges();
  });

  xit('should load page', () => {
    expect(component).toBeTruthy();
  });

  xit('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });
/*
  xit('should show a task', () => {
    const tid = '123';
    spyService = spyOn(service, 'getTask').and.returnValue('TestAccount');
    service.getTask(tid);
    // Check internal function
    expect(spyService).toHaveBeenCalled();

  });
*/


});

