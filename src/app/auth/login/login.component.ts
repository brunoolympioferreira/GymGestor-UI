import { Login } from './../../shared/models/login';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegisterDialogComponent } from '../user-register-dialog/user-register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginData: Login = {} as Login;
  errorMessage: string = '';

  private authService = inject(AuthService)

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginData = this.loginForm.value;
      this.authService.login(this.loginData).subscribe({
        next: token => {
          if (token) {
            console.log('Login bem-sucedido! Token:', token);
            this.router.navigate(['dashboard']);
          }
        },
        error: err => {
          this.errorMessage = err.message;
        }
      });
      this.loginForm.reset();
    }
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(UserRegisterDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Usuário cadastrado com sucesso!', result);
      }
    });
  }
}
