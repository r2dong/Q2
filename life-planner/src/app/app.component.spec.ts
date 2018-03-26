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

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
        AuthService,
        AngularFireAuth,
        {provide: ActivatedRoute, useClass: class {navigate = jasmine.createSpy("navigate")}},
        {provide: Router, useClass: class {navigate = jasmine.createSpy("navigate")}},
        LocationStrategy
        // Router
      ],
      imports: [
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
      ],
      declarations: [
        AppComponent,
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance; 
    expect(app).toBeTruthy();
  }));
  xit(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  xit('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});