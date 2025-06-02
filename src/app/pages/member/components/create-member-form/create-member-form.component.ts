import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../../services/member.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-member-form',
  templateUrl: './create-member-form.component.html',
  styleUrl: './create-member-form.component.scss'
})
export class CreateMemberFormComponent {
  form: FormGroup;
  isSubmitting = false;

  fb = inject(FormBuilder);
  memberService = inject(MemberService);
  dialogRef: MatDialogRef<CreateMemberFormComponent> = inject(MatDialogRef);
  snackBar = inject(MatSnackBar);
  dateAdapter = inject(DateAdapter);

  constructor() {
    this.dateAdapter.setLocale('pt-BR');

    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(150)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      photoUrl: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.form.value;
      if (formValue.dateOfBirth) {
        const date = new Date(formValue.dateOfBirth);
        formValue.dateOfBirth = date.toISOString().split('T')[0];
      }

      this.memberService.create(formValue)
        .pipe(finalize(() => this.isSubmitting = false))
        .subscribe({
          next: () => {
            this.snackBar.open('Membro criado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['success-snackbar']
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open('Erro ao criar membro. Por favor, tente novamente.', 'Fechar', {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: ['error-snackbar']
            });
          }
        });
    }
  }
}