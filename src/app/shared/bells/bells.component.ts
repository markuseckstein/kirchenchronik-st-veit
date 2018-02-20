import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kc-bells',
  templateUrl: './bells.component.html',
  styleUrls: ['./bells.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BellsComponent {
  private _isOn = false;

  @ViewChild('audio') audioRef: ElementRef | undefined;

  get isOn(): string {
    return this._isOn ? `an` : `aus`;
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  toggleBells(): void {
    if (this.audioRef) {
      this._isOn = !this._isOn;
      const audio = this.audioRef.nativeElement as HTMLAudioElement;

      if (this._isOn) {
        audio.play();
      } else {
        audio.pause();
      }
    }
    this.cdr.markForCheck();
  }
}
