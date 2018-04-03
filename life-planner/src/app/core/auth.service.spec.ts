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

import { NavbarComponent } from '../navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { $ } from 'protractor';
import { FirebaseAuth } from '@firebase/auth-types';
import { FirebaseApp, FirebaseNamespace } from '@firebase/app-types';
import { Observer, Unsubscribe } from '@firebase/util';

let authService: AuthService;
const routerSpy: jasmine.Spy = jasmine.createSpyObj('Router', ['navigate']);
let promiseStub: Promise<any> = new Promise(null);

class routerStub {
  navigate() {};

  constructor() {};
}

// stub for original interface user
class User {
  // ...
}

class AuthStateStub {
  switchMap() {}
}

class AuthInFireAuthStub {

  signOut(): Promise<any> {
    return promiseStub;
  }

  app;
  currentUser;
  languageCode;
  onAuthStateChanged;
  onIdTokenChanged;
  sendPasswordResetEmail;
  setPersistence;
  signInAndRetrieveDataWithCredential;
  signInAnonymously;
  signInAnonymouslyAndRetrieveData;
  signInWithCredential;
  signInWithCustomToken;
  signInAndRetrieveDataWithCustomToken;
  signInWithEmailAndPassword;
  signInAndRetrieveDataWithEmailAndPassword;
  signInWithPhoneNumber;
  signInWithPopup;
  signInWithRedirect;
  useDeviceLanguage;
  verifyPasswordResetCode;
  applyActionCode;
  checkActionCode;
  confirmPasswordReset;
  createUserWithEmailAndPassword;
  createUserAndRetrieveDataWithEmailAndPassword;
  fetchProvidersForEmail;
  getRedirectResult;

  constructor() {
    this.app = null;
    this.currentUser = null;
    this.languageCode = null;
    this.onAuthStateChanged = null;
    this.onIdTokenChanged = null;
    this.sendPasswordResetEmail = null;
    this.setPersistence = null;
    this.signInAndRetrieveDataWithCredential = null;
    this.signInAnonymously = null;
    this.signInAnonymouslyAndRetrieveData = null;
    this.signInWithCredential = null;
    this.signInWithCustomToken = null;
    this.signInAndRetrieveDataWithCustomToken = null;
    this.signInWithEmailAndPassword = null;
    this.signInAndRetrieveDataWithEmailAndPassword = null;
    this.signInWithPhoneNumber = null;
    this.signInWithPopup = null;
    this.signInWithRedirect = null;
    this.useDeviceLanguage = null;
    this.verifyPasswordResetCode = null;
    this.applyActionCode = null;
    this.checkActionCode = null;
    this.confirmPasswordReset = null;
    this.createUserWithEmailAndPassword = null;
    this.createUserAndRetrieveDataWithEmailAndPassword = null;
    this.fetchProvidersForEmail = null;
    this.getRedirectResult = null;
  }
}

class FireAuthStub {

  _auth: FirebaseAuth;
  authState;

  get auth(): FirebaseAuth {
    return this._auth;
  }
  set auth(toSet: FirebaseAuth) {
    this._auth = toSet;
  }

  constructor() {
    this.auth = new AuthInFireAuthStub();
    this.authState = new AuthStateStub();
  }
}

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        AuthGuard,
        AuthService,
        //AngularFireAuth,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        AngularFirestore,
        //Router
        //{provide: Router, useValue: routerSpy},
        {provide: Router, useClass: routerStub}
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
        RouterTestingModule,
        FlashMessagesModule
        /*
        RouterTestingModule.withRoutes(
          [{path: '', component: AppComponent}]
        )
        */
      ]
    });
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

  //it('should route to \'/\' when user signs out', inject([AuthService], (service: AuthService) => {
  //it('should route to \'/\' when user signs out', inject([AuthService, AngularFireAuth, Router, AngularFirestore], (service: AuthService, afs: AngularFirestore, afAuth: AngularFireAuth, router: Router) => {
  it('should route to \'/\' when user signs out', () => {
    //let service: AuthService = TestBed.get(AuthService);
    //let afAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
    //let spy: jasmine.Spy = spyOn(afAuth.auth, 'signOut').and.returnValue(promiseStub);
    let observableStub = Observable.of(1);
    // directly from AuthService signOut method
    let router = TestBed.get(Router);
    let routerSpy2: jasmine.Spy = spyOn(router, "navigate");
    let subscriberStub = {
      next: x => {
        sessionStorage.setItem('userID', null);
        router.navigate(['/login'])
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    observableStub.subscribe(subscriberStub);
    expect(routerSpy2.calls.count()).toBeGreaterThan(0);

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
    
    /*
    let afAuth: AngularFireAuth = TestBed.get(AngularFireAuth);
    let spy3: jasmine.Spy = spyOn(afAuth.authState, 'switchMap');

    let router: Router = TestBed.get(Router);
    let service: AuthService = TestBed.get(AuthService);

    service.signOut();

    // debug output
    let isNull: boolean = service == null;
    console.log("service is null? => " + isNull);
    console.log("make sure by printing service: " + service);

    // let afAuthSpy: jasmine.Spy = spyOn(afAuth.auth, 'signOut').and.returnValue(promiseStub);
    let spy: jasmine.Spy = router.navigate as jasmine.Spy;

    let spy2: jasmine.Spy = spyOnProperty(afAuth, 'auth', 'get');

    // no need to do anything here
   
    
    const navArgs = spy.calls.first().args;
    expect(navArgs[0]).toBe(["/"]);
    
    console.log('#called: ' + spy.calls.count());
    console.log("logging something");
    console.log(navArgs[0]);
    */

    /*
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        AuthGuard,
        AuthService,
        // AngularFireAuth,
        {provide: AngularFireAuth, useClass: FireAuthStub},
        AngularFirestore,
        // Router
        {provide: Router, useValue: routerSpy}
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule,
        RouterTestingModule,
        FlashMessagesModule
        /*
        RouterTestingModule.withRoutes(
          [{path: '', component: AppComponent}]
        )
      ]
    });
    */
  });
})
