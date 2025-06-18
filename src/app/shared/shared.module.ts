import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { GenderLabelPipe } from './pipes/gender-label.pipe';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    GenderLabelPipe
  ],
  imports: [
    CommonModule,
    MaterialsModule,
  ],
  exports: [
    CommonModule,
    MaterialsModule,
    GenderLabelPipe
  ]
})
export class SharedModule { }
