import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import {AppRoutingModule} from '../../app-routing.module';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {RolesModule} from '../roles.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import {RoleService} from '../role.service';
import {RoleModel} from '../role.model';

// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { AddRoleComponent } from './add-role.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScheduleComponent } from '../../schedule/schedule.component'

import {By} from '@angular/platform-browser';
import {TaskService} from '../../tasks/task.service';
import {ProjectService} from '../../projects/project.service';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'


describe('AddRoleComponent', () => {
  let component: AddRoleComponent;
  let service: RoleService;
  let fixture: ComponentFixture<AddRoleComponent>;
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
        RolesModule,
        CoreModule,
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        ScheduleComponent,
        NgFullcalendarComponent,
        CalendarComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/roles'},
        TaskService,
        ProjectService,
        RoleService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(AddRoleComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(RoleService);

    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should create a role', () => {
    const role: RoleModel = {
      rid: '',
      name: 'Sample Role For Testing Only',
      color: 'Sample Color'
    };
    spyService = spyOn(service, 'addRole').and.returnValue('TestAccount');
    service.addRole(role);
    // Check internal function
    expect(spyService).toHaveBeenCalled();

  });


});

