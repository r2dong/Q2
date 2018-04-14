import { TestBed, inject } from '@angular/core/testing';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';

import { TaskService } from './task.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {TasksModule} from './tasks.module';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../app.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {APP_BASE_HREF} from '@angular/common';
import {ProjectService} from '../projects/project.service';
import { ScheduleComponent } from '../schedule/schedule.component'

describe('TaskService', () => {
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
        CoreModule, ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        ScheduleComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/tasks'},
        TaskService,
        ProjectService
      ]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));

});
