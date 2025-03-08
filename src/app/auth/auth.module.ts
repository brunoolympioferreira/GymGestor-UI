import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { FormGroupName, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    UserRegisterDialogComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
