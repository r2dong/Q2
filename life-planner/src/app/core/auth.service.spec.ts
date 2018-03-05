import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { MockConnection } from '@angular/http/testing';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/switchMap';
import { User } from './user.model';
import {AuthService} from './auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../environments/environment';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [AuthService, AngularFireAuth]
    });
  });
/*
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
*/
});
