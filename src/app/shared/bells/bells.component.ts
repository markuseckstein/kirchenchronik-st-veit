import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kc-bells',
  templateUrl: './bells.component.html',
  styleUrls: ['./bells.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BellsComponent {
  public isOn = false;

  @ViewChild('audio') audioRef: ElementRef | undefined;

  constructor(private cdr: ChangeDetectorRef) {
  }

  toggleBells(): void {
    if (this.audioRef) {
      this.isOn = !this.isOn;
      const audio = this.audioRef.nativeElement as HTMLAudioElement;

      if (this.isOn) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    this.cdr.markForCheck();
  }
}
