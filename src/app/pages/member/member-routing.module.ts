import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { MemberUpdateComponent } from './components/member-update/member-update.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent
  },
  {
    path: ':id', component: MemberDetailComponent
  },
  {
    path: ':id/edit', component: MemberUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
