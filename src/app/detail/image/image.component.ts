import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'kc-image',
  template: '',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {
  @HostBinding('style.background-image')
  @Input() image: SafeStyle | undefined;
}
