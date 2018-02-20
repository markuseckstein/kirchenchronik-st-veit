import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kc-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfComponent {
  @Input() src: string | undefined;
}
