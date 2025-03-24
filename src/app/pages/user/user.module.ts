import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    ChangePasswordDialogComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UserModule { }
