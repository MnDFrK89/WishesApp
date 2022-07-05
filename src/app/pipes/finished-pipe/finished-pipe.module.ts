import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedPipe } from './finished.pipe';

@NgModule({
  declarations: [FinishedPipe],
  exports: [FinishedPipe],
  imports: [CommonModule],
})
export class FinishedPipeModule {}
