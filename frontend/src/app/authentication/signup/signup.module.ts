import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ]
})
export class SignupModule { }
