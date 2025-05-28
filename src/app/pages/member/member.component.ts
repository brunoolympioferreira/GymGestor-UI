import { Component, inject, Inject } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../shared/models/member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  members: Member[] = [];

  memberService = inject(MemberService);

  ngOnInit(): void {
    this.memberService.getAll().subscribe(data => {
      this.members = data;
    });
  }

  handleView(id: string): void {
    console.log('Visualizar membro:', id);
  }

  handleEdit(id: string): void {
    console.log('Editar membro:', id);
  }
}
