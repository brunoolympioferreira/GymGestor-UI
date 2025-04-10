import { Component, inject, OnInit } from '@angular/core';
import { User, UserDetail } from '../../../shared/models/user';
import { UserService } from '../../../services/user.service';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

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

  editUser(user: User): void {
    console.log('Editar usuário', user);
  }

  deleteUser(user: User): void {
    console.log('Deletar usuário', user);
  }

  viewDetails(user: UserDetail): void {
    this.router.navigate([`/dashboard/user/${user.id}`]);
  }

  goToUserPage() {
    this.router.navigate(['/dashboard/user']);
  }
}
