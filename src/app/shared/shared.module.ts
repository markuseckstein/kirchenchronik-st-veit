import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineComponent } from './headline/headline.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeadlineComponent],
  exports: [HeadlineComponent]
})
export class SharedModule { }
