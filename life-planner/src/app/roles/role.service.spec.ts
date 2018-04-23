import { TestBed, inject } from '@angular/core/testing';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';

import { RoleService } from './role.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {RolesModule} from './roles.module';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';
import {HomeComponent} from '../home/home.component';
import {LoginComponent} from '../login/login.component';
import {AppComponent} from '../app.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {WelcomeComponent} from '../welcome/welcome.component';
import {APP_BASE_HREF} from '@angular/common';
import {TaskService} from '../tasks/task.service';
import {ProjectService} from '../projects/project.service';

describe('RoleService', () => {
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
        CoreModule, ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/roles'},
        TaskService,
        ProjectService,
        RoleService,
      ]
    });
  });

  it('should be created', inject([RoleService], (service: RoleService) => {
    expect(service).toBeTruthy();
  }));

});
