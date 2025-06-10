import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MemberComponent
  },
  {
    path: ':id', component: MemberDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
