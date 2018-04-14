import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';


// Modules
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { EventsModule } from './events.module';
import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import {EventService} from './event.service';
import { EventModel } from './event.model';

//Components
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthService } from '../core/auth.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { EventsComponent } from './events.component';
import { By } from '@angular/platform-browser'
import { ProjectService } from "../projects/project.service";
import { ScheduleComponent } from '../schedule/schedule.component'

describe('EventsComponent', () => {
  let component: EventsComponent;
  let service: EventService;
  let fixture: ComponentFixture<EventsComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let spyService: jasmine.Spy;
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ //EventsComponent,
      AppComponent,
      WelcomeComponent,
      HomeComponent,
      LoginComponent,
      NotFoundComponent,
      NavbarComponent,
      ScheduleComponent
    ],
      imports:[
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        FlashMessagesModule,
        FormsModule,
        SharedModule,
        EventsModule,
        CoreModule
      ],
      providers:[
        {provide: APP_BASE_HREF, useValue:'/events'},
        EventService,
        ProjectService,
      ]
    });
  }));


it('should be created', inject([EventService], (service: EventService)=>{
  expect(service).toBeTruthy();
  }));
});
