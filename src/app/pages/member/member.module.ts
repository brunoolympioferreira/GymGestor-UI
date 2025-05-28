import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MemberModule { }
