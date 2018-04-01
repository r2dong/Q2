import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
// system imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Modules and Services
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TaskService } from './tasks/task.service';
import { TasksModule } from './tasks/tasks.module';

// Components
import { AppComponent } from './app.component';
import { RouterModule, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { componentFactoryName } from '@angular/compiler';
import { environment } from '../environments/environment';
import { AuthService } from './core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        NotFoundComponent,
        NavbarComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FlashMessagesModule.forRoot(),
        FormsModule,
        CoreModule,
        SharedModule,
        TasksModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        TaskService,
        AngularFirestore,
        AuthService,
        AngularFireAuth,
        //{provide: Router, useClass: class {navigate = jasmine.createSpy("navigate")}},
        {provide: ActivatedRoute, useClass: jasmine.createSpy("ActivatedRoute")},
        LocationStrategy
      ]
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance; 
    expect(app).toBeTruthy();
  });
  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  });
});
