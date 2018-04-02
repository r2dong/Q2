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
import * as firebase from 'firebase';
// Components
import {AppComponent} from '../../app.component';
import { LoginComponent } from '../../login/login.component';
import { HomeComponent } from '../../home/home.component';
import { ProjectDetailComponent } from './project-detail.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { AuthService } from '../../core/auth.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { NavbarComponent } from '../../navbar/navbar.component';


import { ActivatedRoute, Router, Params } from '@angular/router';


import { By } from '@angular/platform-browser';
import {TaskService} from '../../tasks/task.service';
import {EventService} from "../../events/event.service";


describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let service: ProjectService;
  let fixture: ComponentFixture<ProjectDetailComponent>;
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
        ProjectsModule,
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
        { provide: APP_BASE_HREF, useValue: '/project-detail'},
        ProjectService,
        TaskService,
        EventService,
        FlashMessagesService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {

    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(ProjectService);


    fixture.detectChanges();
  });

  xit('should load page', () => {
    expect(component).toBeTruthy();
  });

  xit('should get Test Account user', () => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });
  /*
    xit('should show a project', () => {
      const tid = '123';
      spyService = spyOn(service, 'getProject').and.returnValue('TestAccount');
      service.getProject(tid);
      // Check internal function
      expect(spyService).toHaveBeenCalled();

    });
  */


});

