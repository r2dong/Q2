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
import { ProjectsModule } from '../projects.module';
import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import {ProjectService} from '../project.service';
import {ProjectModel} from '../project.model';

// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { AddProjectComponent } from './add-project.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let service: ProjectService;
  let fixture: ComponentFixture<AddProjectComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyService: jasmine.Spy;

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
        ProjectsModule,
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
        { provide: APP_BASE_HREF, useValue: '/projects'},
        ProjectService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(ProjectService);

    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should create a project', () => {
    const project: ProjectModel = {
      pid: '',
      name: '',
      dueDateTime: '',
      tids: []
    };
    spyService = spyOn(service, 'addProject').and.returnValue('TestAccount');
    service.addProject(project);
    // Check internal function
    expect(spyService).toHaveBeenCalled();

  });



});

