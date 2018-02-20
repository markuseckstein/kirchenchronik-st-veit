import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineComponent } from './headline/headline.component';
import { BellsComponent } from './bells/bells.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeadlineComponent, BellsComponent],
  exports: [HeadlineComponent, BellsComponent]
})
export class SharedModule { }
