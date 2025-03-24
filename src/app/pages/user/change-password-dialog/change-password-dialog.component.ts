import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { UpdateUser, User } from '../../../shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent implements OnChanges {
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsMatch: boolean = true;

  private dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.passwordsMatch) {
      this.dialogRef.close(this.newPassword);
      const user: UpdateUser = {
        password: this.newPassword
      }
      console.log(user);
      this.userService.changePassword(user).subscribe({
        next: () => {
          this.showSucces('Senha alterada com sucesso!');
        },
        error: (error) => {
          this.showError('Erro ao alterar senha!');
          console.error('Erro ao alterar senha:', error);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newPassword'] || changes['confirmPassword']) {
      this.checkPasswords();
    }
  }

  checkPasswords(): void {
    this.passwordsMatch = this.newPassword === this.confirmPassword;
  }

  showSucces(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
