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

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

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
        AuthService,
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
    //fixture.detectChanges();
    //el = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template should adjust to login status', () => {
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('button'));
    expect(el.nativeElement.textContent.trim()).toBe('keyboard_arrow_rightLogin with Google');
    spyOnProperty(auth, 'user', 'get');
  });
});
