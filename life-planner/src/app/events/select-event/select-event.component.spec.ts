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
import {EventsModule} from '../events.module';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import {EventService} from '../event.service';
import {ProjectService} from '../../projects/project.service';
import { SelectEventComponent } from './select-event.component';

// Components
import {AppComponent} from '../../app.component';
import {LoginComponent} from '../../login/login.component';
import {HomeComponent} from '../../home/home.component';
import {WelcomeComponent} from '../../welcome/welcome.component';
import {AuthService} from '../../core/auth.service';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {NavbarComponent} from '../../navbar/navbar.component';
import { NgFullcalendarComponent } from '../../ng-fullcalendar/ng-fullcalendar.component';
import { CalendarComponent } from 'ng-fullcalendar'

describe('SelectEventComponent', () => {
  let component: SelectEventComponent;
  let fixture: ComponentFixture<SelectEventComponent>;
  let service: EventService;
  let de: DebugElement;
  let spy: jasmine.Spy;
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        NgFullcalendarComponent,
        CalendarComponent
      ],
      imports: [        
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        FlashMessagesModule,
        FormsModule,
        SharedModule,
        EventsModule,
        CoreModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/role-detail'},
        EventService,
        ProjectService,
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(SelectEventComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(EventService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
