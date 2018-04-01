import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

/*
  Create a CoreModule with providers for the singleton services you load when the application starts.

  Import CoreModule in the root AppModule only. Never import CoreModule in any other module.

  Consider making CoreModule a pure services module with no declarations.
  */


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [ AuthService ]
})
export class CoreModule { }
