import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Member } from '../../../../shared/models/member';
import { MatDialog } from '@angular/material/dialog';
import { CreateMemberFormComponent } from '../create-member-form/create-member-form.component';
import { MemberService } from '../../../../services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  @Input() members: Member[] = [];

  @Output() view = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() memberCreated = new EventEmitter<void>();

  dialog = inject(MatDialog);
  memberService = inject(MemberService);
  router = inject(Router);

  displayedColumns: string[] = ['fullName', 'cpf', 'email', 'phone', 'actions'];

  filter = {
    id: '',
    fullName: '',
    cpf: '',
    email: ''
  };

  ngOnInit(): void { }

  get filteredMembers(): Member[] {
    return this.members.filter(m =>
      (!this.filter.id || (m.id && m.id.includes(this.filter.id))) &&
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
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.memberCreated.emit();
      }
    });
  }

  loadMembers(): void {
    this.memberService.getAll().subscribe((members) => {
      this.members = members.sort((a, b) => b.fullName.localeCompare(a.fullName));
    });
  }

  viewDetails(member: Member): void {
    this.router.navigate([`/dashboard/members/${member.id}`]);
  }
}
