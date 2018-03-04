import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from '../core/auth.service';

// Modules
import { AppRoutingModule } from '../app-routing.module';
import { CoreModule } from '../core/core.module';

// Components
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { TasksComponent } from './tasks.component';
import { WelcomeComponent } from '../welcome/welcome.component';


describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        FormsModule,
        CoreModule, ],
      declarations: [
        AppComponent,
        WelcomeComponent,
        HomeComponent,
        LoginComponent,
        TasksComponent ],
      providers: [ { provide: APP_BASE_HREF, useValue: '/tasks'} ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(AuthService, 'currentUserId').and.returnValue('TestAccount');
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load page', () => {
    expect(component).toBeTruthy();
  });

  it('should get Test Account user', async() => {
    expect(AuthService.currentUserId()).toBe('TestAccount');
  });

  it('should fail reading non-task', async() => {
    component.readTask('not an actual id')
      .then( ref => expect(ref).toBeNull())
      .catch(function() {expect(true).toBeFalsy(); });
  });

  it('should create a task', async() => {
    component.createTask('creating task', 'None', 'Awesome task')
      .then(ref => expect(ref.valueOf()).toBeTruthy())
      .catch(function() {expect(true).toBeFalsy(); });
  });

  it('should read test task', async() => {
    component.readTask('DYNDlzsp9KDYMMiCtLCT')
      .then(ref => expect(ref.name).toBe('Test Task'))
      .catch(function() {expect(true).toBeFalsy(); });
  });

  it('should update a task', async() => {
    component.readTask('DYNDlzsp9KDYMMiCtLCT')
      .then(ref => {
        expect(ref.name).toBe('Test Task');
        component.updateTask('DYNDlzsp9KDYMMiCtLCT', 'Wowza' )
          .then( newref => {
            if (newref.valueOf()) {
              component.readTask('DYNDlzsp9KDYMMiCtLCT')
                .then( newestref => expect(newestref.name).toBe('Wowza'))
                .catch(function() {expect(true).toBeFalsy(); });
            }
          })
          .catch( function() {expect(true).toBeFalsy(); });
      })
      .catch(function() {expect(true).toBeFalsy(); });
  });

  it('should delete a task', async() => {
    component.deleteTask('DYNDlzsp9KDYMMiCtLCT')
      .then(ref => {
        if ( ref.valueOf()) {
          component.db.collection('users').doc(AuthService.currentUserId()).collection('tasks').doc('DYNDlzsp9KDYMMiCtLCT').ref.get()
            .then(existref => expect(existref.exists).toBeFalsy())
            .catch(function() { expect(true).toBeFalsy(); });
        } else {
          expect(true).toBeFalsy();
        }
      })
      .catch(function() {expect(true).toBeFalsy(); });
  });

});

