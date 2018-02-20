import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kc-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent {
  @Input() src: string | undefined;
}
