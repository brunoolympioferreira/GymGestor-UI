import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateMemberFormComponent } from './components/create-member-form/create-member-form.component';


@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent,
    CreateMemberFormComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }
