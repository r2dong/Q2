import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {Location} from '@angular/common';

// Modules and Services
import {AppRoutingModule} from './app-routing.module';

// Authentication Module
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {TasksModule} from './tasks/tasks.module';
import {ProjectsModule} from './projects/projects.module';

// Components
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NavbarComponent} from './navbar/navbar.component';
import {EventsModule} from './events/events.module';
import {RolesModule} from './roles/roles.module';

//calendar
//import { FullCalendarModule } from 'ng-fullcalendar';
import { NgFullcalendarComponent } from './ng-fullcalendar/ng-fullcalendar.component'
import { CalendarComponent } from 'ng-fullcalendar'
import { GoalsComponent } from './goals/goals.component';
import { AddGoalComponent } from './goals/add-goal/add-goal.component';
import { EditGoalComponent } from './goals/edit-goal/edit-goal.component';
import { GoalDetailComponent } from './goals/goal-detail/goal-detail.component';
import { DefaultViewService } from './ng-fullcalendar/default-view.service';
import { NgFullcalendarModule } from './ng-fullcalendar/ng-fullcalendar.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WelcomeComponent,
    NotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    FormsModule,
    CoreModule,
    SharedModule,
    TasksModule,
    ProjectsModule,
    EventsModule,
    RolesModule,
    NgFullcalendarModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(public location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
