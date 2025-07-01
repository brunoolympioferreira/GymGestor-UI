import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatChipsModule
  ]
})
export class MaterialsModule { }
