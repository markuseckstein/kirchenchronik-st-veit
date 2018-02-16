import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../shared/shared.module';
import { PreviewComponent } from './preview/preview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [OverviewComponent, PreviewComponent]
})
export class OverviewModule { }
