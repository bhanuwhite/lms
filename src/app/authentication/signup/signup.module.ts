import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/component/spinner/spinner.component';
import { SpinnerModule } from 'src/app/component/spinner/spinner.modules';
import { NgModule } from '@angular/core';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [
    SignupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    DividerModule
    // SpinnerModule
  ]
})
export class SignupModule { }
