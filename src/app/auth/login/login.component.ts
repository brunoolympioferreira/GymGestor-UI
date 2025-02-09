import { Component } from '@angular/core';
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
      console.log('Login realizado com sucesso!', this.loginForm.value);
      localStorage.setItem('userToken', 'fake-jwt-token');
      this.router.navigate(['/dashboard']);

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
