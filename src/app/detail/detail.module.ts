import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from '../shared/shared.module';
import { ImageComponent } from './image/image.component';
import { VideoComponent } from './video/video.component';
import { PdfComponent } from './pdf/pdf.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DetailComponent, ImageComponent, VideoComponent, PdfComponent]
})
export class DetailModule { }
