import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListControlComponent } from './chip-list-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChipListControlComponent],
  exports: [ChipListControlComponent],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ChipListControlModule {}
