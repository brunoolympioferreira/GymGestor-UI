import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../shared/models/user';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrl: './user-register-dialog.component.scss'
})
export class UserRegisterDialogComponent {
  @Output() userRegistered = new EventEmitter<boolean>();
  userForm: FormGroup;
  roles: Role[] = ['Admin', 'User'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserRegisterDialogComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.register(this.userForm.value).subscribe({
        next: () => {
          this.showSucces('Usuário cadastrado com sucesso');
          this.userRegistered.emit(true);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erro ao cadastrar usuário', error);
          this.showError('Erro ao cadastrar usuário');
        },
        complete: () => {
          console.log('Cadastro finalizado');
        }
      });
    }
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

  closeDialog() {
    this.dialogRef.close();
  }
}
