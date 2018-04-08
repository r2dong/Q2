import { ComponentFixture, TestBed } from '@angular/core/testing';

import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {DebugElement} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {By} from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Components
import {AppComponent} from '../app.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from '../home/home.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AuthService } from '../core/auth.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NavbarComponent } from '../navbar/navbar.component';
import {Observable} from 'rxjs/Observable';

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
      uid: 'stubbedUid',
      email: 'stubbedEmail',
      photoURL: 'stubbedPhotoURL',
      displayName: 'aGiantStubUserName',
      favoriteColor: 'pink',
    });
  }
}



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spy: jasmine.Spy;
  let de: DebugElement;
  let el: DebugElement;
  let service: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        CoreModule,
        AppRoutingModule,
        FlashMessagesModule
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
        { provide: APP_BASE_HREF, useValue: '/login'},
        {provide: AuthService, useValue: new AuthServiceStubFullClass()},

        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    spy = spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should adjust to login status', () => {
    const authSpy: jasmine.Spy = spyOnProperty(service, 'user', 'get');
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
