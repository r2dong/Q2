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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
