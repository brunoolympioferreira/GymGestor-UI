import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../shared/models/member';
import { delay } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  memberService = inject(MemberService);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getAll()
      .pipe(delay(300))
      .subscribe({
        next: (data) => {
          this.members = [...data];
        },
        error: (error) => {
          console.error('Error loading members:', error);
        }
      });
  }

  handleView(id: string): void {
    console.log('Visualizar membro:', id);
  }

  handleEdit(id: string): void {
    console.log('Editar membro:', id);
  }

  onMemberCreated(): void {
    this.loadMembers();
  }
}
