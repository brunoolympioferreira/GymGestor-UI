import { Component, inject, OnInit } from '@angular/core';
import { User, UserDetail } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'role', 'actions'];
  users: User[] = [];

  private userService = inject(UserService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().pipe(
      tap((data: User[]) => this.users = data),
      catchError((error) => {
        console.error('Erro ao buscar usuários', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  deleteUser(userId: string): void {
    this.userService.delete(userId).subscribe({
      next: () => {
        this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', { duration: 3000 });
        this.fetchUsers(); // Atualiza a lista de usuários
      },
      error: () => {
        this.snackBar.open('Erro ao excluir usuário.', 'Fechar', { duration: 3000 });
      }
    });
  }

  confirmDelete(user: UserDetail): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: `Deseja realmente deletar o usuário ${user.email}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  viewDetails(user: UserDetail): void {
    this.router.navigate([`/dashboard/user/${user.id}`]);
  }

  goToUserPage() {
    this.router.navigate(['/dashboard/user']);
  }
}
