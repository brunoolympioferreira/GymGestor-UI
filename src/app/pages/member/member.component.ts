import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../shared/models/member';
import { delay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  memberService = inject(MemberService);
  snackBar = inject(MatSnackBar);

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

  onMemberUpdated(): void {
    this.loadMembers();
    this.snackBar.open('Membro atualizado com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}
