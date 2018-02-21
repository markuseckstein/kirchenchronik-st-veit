import { Component, ChangeDetectionStrategy } from '@angular/core';
import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';


export const routerTransition = trigger('routerAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' })
      , { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),

      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true })
    ])
  ])
]);



@Component({
  selector: 'kc-root',
  template: '<div [@routerAnimation]="getState(routerOutlet)"><router-outlet #routerOutlet="outlet"></router-outlet></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routerTransition]
})
export class AppComponent {
  getState(outlet) {
    let state = 'home';
    if (outlet.isActivated) {
      if (outlet.activatedRoute.snapshot.url[0]) {
        state = outlet.activatedRoute.snapshot.url[0].toString();
      }
    }
    return state;
  }
}
