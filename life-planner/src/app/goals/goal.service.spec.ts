import { TestBed, inject } from '@angular/core/testing';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';

import {GoalService} from './goal.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {GoalsModule} from './goals.module';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../app.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {APP_BASE_HREF} from '@angular/common';
import { NgFullcalendarComponent } from '../ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar';

describe('GoalService', () => {
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
        CoreModule
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
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/goals'},
        GoalService,
      ]
    });
  });

  it('should be created', inject([GoalService], (service: GoalService) => {
    expect(service).toBeTruthy();
  }));
});
