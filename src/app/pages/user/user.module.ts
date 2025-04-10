import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [
    UserComponent,
    ChangePasswordDialogComponent,
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class UserModule { }
