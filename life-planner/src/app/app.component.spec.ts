import { TestBed, async } from '@angular/core/testing';
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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        AuthService,
        AngularFireAuth,
        //{provide: Router, useClass: class {navigate = jasmine.createSpy("navigate")}},
        {provide: ActivatedRoute, useClass: jasmine.createSpy("ActivatedRoute")},
        LocationStrategy
      ],
      imports: [
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
      ]
    }).compileComponents();
  }));
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance; 
    expect(app).toBeTruthy();
  });
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});