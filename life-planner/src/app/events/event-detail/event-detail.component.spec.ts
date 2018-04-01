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
import { EventsModule } from '../events.module';
import {FormsModule} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';

import {EventService} from '../event.service';
import {EventModel} from '../event.model';
import * as firebase from 'firebase';
// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { EventDetailComponent } from './event-detail.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';

import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import {async} from "q";
import {FlashMessage} from "angular2-flash-messages/module/flash-message";

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let service: EventService;
  let de: DebugElement;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,WelcomeComponent,HomeComponent,LoginComponent, NotFoundComponent,NavbarComponent],
      imports:[
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
      providers:[
        {provide: APP_BASE_HREF,useValue:'/event-detail'},
        EventService,
        FlashMessagesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(EventService);
    fixture.detectChanges();
  });
  xit('should load page', () => {
    expect(component).toBeTruthy();
  });

  xit('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });
});
