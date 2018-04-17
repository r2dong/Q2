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
import {TasksModule} from '../../tasks/tasks.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';

import {TaskService} from '../../tasks/task.service';

// Components
import {AppComponent} from '../../app.component';
import {LoginComponent} from '../../login/login.component';
import {HomeComponent} from '../../home/home.component';
import {WelcomeComponent} from '../../welcome/welcome.component';
import {AuthService} from '../../core/auth.service';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {NavbarComponent} from '../../navbar/navbar.component';

import {ProjectService} from '../../projects/project.service';
import {RolesModule} from '../roles.module';
import {ShowRolesComponent} from './show-roles.component';
import {RoleService} from '../role.service';


describe('ShowTasksComponent', () => {
  let component: ShowRolesComponent;
  let fixture: ComponentFixture<ShowRolesComponent>;
  let service: RoleService;
  let de: DebugElement;
  let spy: jasmine.Spy;

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
        RolesModule,
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
        {provide: APP_BASE_HREF, useValue: '/role-detail'},
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
    fixture = TestBed.createComponent(ShowRolesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(RoleService);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
