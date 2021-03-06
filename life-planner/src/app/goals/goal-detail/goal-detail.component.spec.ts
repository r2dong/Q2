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
import {GoalsModule} from '../goals.module';

import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import {GoalService} from '../goal.service';
import {GoalModel} from '../goal.model';
import * as firebase from 'firebase';
// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import {GoalDetailComponent} from './goal-detail.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar';



describe('GoalDetailComponent', () => {
  let component: GoalDetailComponent;
  let service: GoalService;
  let fixture: ComponentFixture<GoalDetailComponent>;
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
        GoalsModule,
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
        { provide: APP_BASE_HREF, useValue: '/goal-detail'},
        GoalService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(GoalDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(GoalService);


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

