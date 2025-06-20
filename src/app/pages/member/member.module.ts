import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateMemberFormComponent } from './components/create-member-form/create-member-form.component';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberUpdateComponent } from './components/member-update/member-update.component';

@NgModule({
  declarations: [
    MemberComponent,
    MemberListComponent,
    CreateMemberFormComponent,
    MemberDetailComponent,
    MemberUpdateComponent,
  ],
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class MemberModule { }
