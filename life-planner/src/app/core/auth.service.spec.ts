import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { Observable } from 'rxjs';

let authService: AuthService;
const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        AuthGuard,
        AuthService,
        AngularFireAuth,
        AngularFirestore,
        // Router
        {provide: Router, useValue: routerSpy}
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
        RouterTestingModule,
        /*
        RouterTestingModule.withRoutes(
          [{path: '', component: AppComponent}]
        )
        */
      ]
    });
  });

  beforeEach(() => {
    //authService = new AuthService(RouterTestingModule);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should return true if user is logged in', () => {
    spyOn(AuthService, 'currentUserId').and.returnValue("stringStub");
    expect(AuthService.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    spyOn(AuthService, 'currentUserId').and.returnValue(null);
    expect(AuthService.isLoggedIn()).toBeFalsy();
  });

  //it('should route to \'/\' when user signs out', inject([AuthService, AngularFireAuth, Router, AngularFirestore], (service: AuthService, afs: AngularFirestore, afAuth: AngularFireAuth, router: Router) => {
  it('should route to \'/\' when user signs out', () => {
    let promiseStub: Promise<any> = new Promise(null);
    /*
    let spy1: jasmine.Spy = spyOn(afAuth.auth, 'signOut').and.returnValue(promiseStub);
    let spy2: jasmine.Spy = spyOn(promiseStub, 'then').and.callThrough();
    let sessionStorageSpy: jasmine.Spy = spyOn(sessionStorage, 'setItem');
    */
    // let spy: jasmine.Spy = spyOn(router, 'navigate');
    //let spy: jasmine.Spy = spyOn(service.router, 'navigate')
    /*
    service.user = Observable.of({
      uid: "stubbedUid",
      email: "stubbedEmail",
      photoURL: "stubbedPhotoURL",
      displayName: "aGiantStubUserName",
      favoriteColor: "pink",
    })
    */ 
    //const spy = service.router.navigate as jasmine.Spy;

    /*
    var $scope;
    var $q;
    var deferred;

    $q = _$q_;
    $scope = _$rootScope_.$new();
    deferred = _$q_.defer();
    */

    let router: Router = TestBed.get(Router);
    let service: AuthService = TestBed.get(AuthService);
    let afAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
    let afAuthSpy: jasmine.Spy = spyOn(afAuth.auth, 'signOut').and.returnValue(promiseStub);
    promiseStub.then()
    let spy: jasmine.Spy = router.navigate as jasmine.Spy;
    
    service.signOut();
    const navArgs = spy.calls.first().args;
    expect(navArgs[0]).toBe(["/"]);
    
    console.log('#called: ' + spy.calls.count());
    console.log("logging something");
    console.log(navArgs[0]);
  });
})
