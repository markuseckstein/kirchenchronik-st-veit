import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kc-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  @Input() src: string | undefined;

  constructor() { }


}
