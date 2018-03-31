import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { AuthGuard } from '../core/auth.guard';
import { AuthService } from '../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterModule, Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { Observable } from 'rxjs/Observable';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

export class AuthServiceStubFullClass {

  _user: Observable<User>;
  get user(): Observable<User> {
    return this._user;
  }
  set user(toSet: Observable<User>) {
    this._user = toSet;
  }

  constructor() {
    this.user = Observable.of({
      uid: "stubbedUid",
      email: "stubbedEmail",
      photoURL: "stubbedPhotoURL",
      displayName: "aGiantStubUserName",
      favoriteColor: "pink",
    }) 
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let auth: AuthService;
  let authServiceStub : Partial<AuthService> = {
    user: Observable.of({
      uid: "stubbedUid",
      email: "stubbedEmail",
      photoURL: "stubbedPhotoURL",
      displayName: "aGiantStubUserName",
      favoriteColor: "pink",
    }) 
  }
  let authServiceStub2 : Partial<AuthService> = {
    get user() {
      return Observable.of({
        uid: "stubbedUid",
        email: "stubbedEmail",
        photoURL: "stubbedPhotoURL",
        displayName: "aGiantStubUserName",
        favoriteColor: "pink",
      })
    }
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        // fixed 'unable to resolve all parameters to Router (?, ?, ?, ?, ?, ?, ?, ?)'
        {provide: Router, useClass: class {navigate = jasmine.createSpy("navigate")}},
        // Router,
        AuthGuard,
        {provide: AuthService, useValue: new AuthServiceStubFullClass()},
        AngularFireAuth,
        AngularFirestore,
      ],
      imports: [
        AppRoutingModule,
        RouterModule,
        AngularFireModule.initializeApp(environment.firebase)
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = fixture.debugElement.injector.get(AuthService);
    //fixture.detectChanges();
    //el = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('template should adjust to login status', () => {
    let authSpy: jasmine.Spy = spyOnProperty(auth, 'user', 'get');
    authSpy.and.returnValue(null);
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('button'));
    expect(el.nativeElement.textContent.trim()).toBe('keyboard_arrow_rightLogin with Google');
    authSpy.and.callThrough();
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('button'));
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});
