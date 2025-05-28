import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Member } from '../../../../shared/models/member';
import { MatDialog } from '@angular/material/dialog';
import { CreateMemberFormComponent } from '../create-member-form/create-member-form.component';
import { MemberService } from '../../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent {
  @Input() members: any[] = [];

  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  dialog = inject(MatDialog);
  memberService = inject(MemberService);

  displayedColumns: string[] = ['fullName', 'cpf', 'email', 'phone', 'actions'];

  filter = {
    id: '',
    fullName: '',
    cpf: '',
    email: ''
  };

  get filteredMembers(): Member[] {
    return this.members.filter(m =>
      (!this.filter.id || m.id.includes(this.filter.id)) &&
      (!this.filter.fullName || m.fullName.toLowerCase().includes(this.filter.fullName.toLowerCase())) &&
      (!this.filter.cpf || m.cpf.includes(this.filter.cpf)) &&
      (!this.filter.email || m.email.toLowerCase().includes(this.filter.email.toLowerCase()))
    );
  }

  clearFilter(): void {
    this.filter = { id: '', fullName: '', cpf: '', email: '' };
  }

  openNewMemberDialog(): void {
    const dialogRef = this.dialog.open(CreateMemberFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMembers();
        console.log('Membro cadastrado com sucesso!', result);
      }
    });
  }

  loadMembers(): void {
    this.memberService.getAll().subscribe((members) => {
      this.members = members;
    });
  }
}
