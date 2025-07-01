import { Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MemberService } from '../../../../services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-update',
  templateUrl: './member-update.component.html',
  styleUrl: './member-update.component.scss'
})
export class MemberUpdateComponent implements OnInit {
  form!: FormGroup;
  memberId!: string;
  loading = false;

  private fb = inject(FormBuilder);
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  private dialogRef = inject(MatDialogRef<MemberUpdateComponent>);

  @Output() memberUpdated = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: string }) {
    this.memberId = this.data.id;
  }

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadMember();
  }
  initForm() {
    this.form = this.fb.group({
      email: [''],
      phone: [''],
      photoUrl: [''],
      address: this.fb.group({
        street: [''],
        number: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      healthRecords: this.fb.array([])
    });
  }

  get healthRecords(): FormArray {
    return this.form.get('healthRecords') as FormArray;
  }

  addHealthRecord(data: any = {}) {
    const group = this.fb.group({
      title: [data.title || ''],
      description: [data.description || ''],
    });
  }
  loadMember() {
    if (!this.data.id) {
      console.error('Member ID is null');
      return;
    }
    this.loading = true;
    this.memberService.getById(this.data.id).subscribe({
      next: (data) => {
        this.form.patchValue(data);
        data.healthRecord?.forEach(record => this.addHealthRecord(record));
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.memberService.updateMember(this.data.id, this.form.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.memberUpdated.emit(); // Adicione essa linha
      },
      error: (err) => console.error(err),
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
