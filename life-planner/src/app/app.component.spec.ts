import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
// system imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Modules and Services
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TaskService } from './tasks/task.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        TasksComponent,
        AddTaskComponent,
        TaskDetailsComponent,
        NotFoundComponent,
        NavbarComponent,
        EditTaskComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FlashMessagesModule.forRoot(),
        FormsModule,
        CoreModule,
        SharedModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        TaskService
      ]
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
