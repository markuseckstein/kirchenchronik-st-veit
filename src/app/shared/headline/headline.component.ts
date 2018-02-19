import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kc-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadlineComponent {
  @Input() heading: string | undefined;
  @Input() subHeading: string | undefined;
  @Output() back = new EventEmitter<void>();
}
