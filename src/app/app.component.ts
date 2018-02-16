import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kc-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
