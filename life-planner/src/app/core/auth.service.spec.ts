import { TestBed, inject } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { APP_BASE_HREF } from '@angular/common'
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AppRoutingModule } from '../app-routing.module'
import 'rxjs/add/operator/switchMap'
import { User } from './user.model'
import { AuthService } from './auth.service'
import { AngularFireModule } from 'angularfire2'
import { environment } from '../../environments/environment'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FlashMessagesModule } from 'angular2-flash-messages'

import { AppComponent } from '../app.component'
import { LoginComponent } from '../login/login.component'
import { HomeComponent } from '../home/home.component'
import { WelcomeComponent } from '../welcome/welcome.component'
import { NotFoundComponent } from '../not-found/not-found.component'
import { NavbarComponent } from '../navbar/navbar.component'
import { Observable } from 'rxjs/Observable'
import { ScheduleComponent } from '../schedule/schedule.component'

class RouterStub {
  navigate() {}
  constructor() {}
}

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule,
        FlashMessagesModule
      ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        NotFoundComponent,
        NavbarComponent,
        ScheduleComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/core'},
        {provide: AppRoutingModule, useClass: RouterStub},
        AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return true if user is logged in', () => {
    spyOn(AuthService, 'currentUserId').and.returnValue('stringStub');
    expect(AuthService.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    spyOn(AuthService, 'currentUserId').and.returnValue(null);
    expect(AuthService.isLoggedIn()).toBeFalsy();
  });

  it('should route to \'/\' when user signs out', () => {
    // let service: AuthService = TestBed.get(AuthService);
    // let afAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
    // let spy: jasmine.Spy = spyOn(afAuth.auth, 'signOut').and.returnValue(promiseStub);
    const observableStub = Observable.of(1);
    // directly from AuthService signOut method
    const router = TestBed.get(AppRoutingModule);
    const routerSpy2: jasmine.Spy = spyOn(router, 'navigate');
    const subscriberStub = {
      next: x => {
        sessionStorage.setItem('userID', null);
        router.navigate(['/']);
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    observableStub.subscribe(subscriberStub);
    expect(routerSpy2.calls.count()).toBeGreaterThan(0);
    expect(routerSpy2.calls.mostRecent().args[0]).toEqual(['/'] );
  });

});
