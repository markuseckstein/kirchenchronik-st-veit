import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PROVIDER } from '../../providers';
import { ImageInfo } from '../../shared/image-info';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'kc-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit, OnDestroy {
  public category: string | null;
  public images: ImageInfo[] = [];
  private keySubscription = Subscription.EMPTY;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, @Inject(DATA_PROVIDER) private data: any) {
    this.category = this.activatedRoute.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    if (this.category) {
      const imageData = this.data[this.category].images;
      if (imageData) {
        this.images = imageData.slice();
      }
    }
    this.keySubscription = fromEvent<KeyboardEvent>(document, 'keyup')
      .subscribe((evt: KeyboardEvent) => {
        console.log(evt);
        switch (evt.code) {
          case 'Escape':
          case 'Backspace':
            this.onBack();
            break;
          case 'Space':
          case 'ArrowRight':
            this.startWithFirst();
            break;
        }
      });
  }

  ngOnDestroy() {
    this.keySubscription.unsubscribe();
  }

  getFullImageUrl(file: string): string {
    const entry = this.images.find(x => x.name === file);
    if (entry) {
      return `assets/Kirchenchronik_thumb/${this.category}/${entry.thumbName}`;
    }
    return '';
  }

  onBack(): void {
    this.router.navigate(['']);
  }

  startWithFirst(): void {
    this.router.navigate(['/detail', this.category, this.images[0].name]);
  }
}
