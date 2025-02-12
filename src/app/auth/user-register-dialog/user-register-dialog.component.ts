import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../shared/models/user';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrl: './user-register-dialog.component.scss'
})
export class UserRegisterDialogComponent {
  userForm: FormGroup;
  roles: Role[] = ['Admin', 'User'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserRegisterDialogComponent>
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required]
    });
  }

  onSubmit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
