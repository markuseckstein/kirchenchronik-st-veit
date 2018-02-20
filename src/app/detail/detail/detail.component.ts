import { Component, OnInit, Inject, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DATA_PROVIDER } from '../../providers';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { DomSanitizer, SafeStyle, SafeResourceUrl } from '@angular/platform-browser';
import { ImageInfo, AssetType } from '../../shared/image-info';

declare function unescape(s: string): string;

@Component({
  selector: 'kc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {
  public src: string | null | undefined;
  public category: string | null | undefined;
  public imageDescription: string | undefined;
  public imageUrl: string | undefined;
  public imageUrlStyle: SafeStyle | undefined;
  public documentUrlResource: SafeResourceUrl | undefined;
  public pageInfo: string | undefined;
  public assetType: AssetType = 'image';
  private routeSubscription = Subscription.EMPTY;
  private keySubscription = Subscription.EMPTY;

  constructor(
    private router: Router,
    @Inject(DATA_PROVIDER) private data: any,
    activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    this.routeSubscription = activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        this.src = params.get('file');
        this.category = params.get('category');
        this.imageDescription = undefined;
        this.imageUrl = `assets/Kirchenchronik_main/${this.category}/${this.src}`;
        this.imageUrlStyle = sanitizer.bypassSecurityTrustStyle(`url('${this.imageUrl}')`);
        this.documentUrlResource = sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
        if (this.src && this.data && this.category) {
          const allFiles = this.data[this.category].images;
          const entry: ImageInfo | undefined = allFiles.find(x => x.name === this.src);
          if (entry) {
            this.assetType = entry.type;
          }
        }


        if (this.src && this.data && this.category) {
          this.imageDescription = this.getDescription(this.src, this.data[this.category].images);
          this.pageInfo = this.getPageInfo(this.src, this.data[this.category].images);
        }
        this.cdr.markForCheck();
      });
  }

  ngOnInit() {
    this.keySubscription = fromEvent<KeyboardEvent>(document, 'keyup')
      .subscribe((evt: KeyboardEvent) => {
        console.log(evt);
        switch (evt.code) {
          case 'ArrowLeft':
          case 'Backspace':
            this.onPrev();
            break;
          case 'ArrowRight':
          case 'Space':
            this.onNext();
            break;
          case 'Escape':
            this.onBack();
            break;
        }
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.keySubscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/overview', this.category]);
  }

  onNext(): void {
    if (this.src && this.data && this.category) {
      const nextFile = this.getNextFile(this.src, this.data[this.category].images);
      if (nextFile) {
        this.router.navigate(['/detail', this.category, nextFile]);
      }
    }
  }

  onPrev(): void {
    if (this.src && this.data && this.category) {
      const prevFile = this.getPrevFile(this.src, this.data[this.category].images);
      if (prevFile) {
        this.router.navigate(['/detail', this.category, prevFile]);
      }
    }
  }

  private getDescription(fileName: string | null, allFiles: ImageInfo[]): string | undefined {
    if (!fileName) {
      return undefined;
    }
    const entry = allFiles.find(x => x.name === fileName);
    return entry ? entry.description : undefined;
  }

  private getPageInfo(fileName: string | null, allFiles: ImageInfo[]): string | undefined {
    let result: string | undefined;
    if (fileName) {
      const idx = allFiles.findIndex(x => x.name === fileName);
      if (idx > -1) {
        result = `${idx + 1} / ${allFiles.length}`;
      }
    }
    return result;
  }


  private getNextFile(currentFile: string, allFiles: ImageInfo[]): string | undefined {
    const idx = allFiles.findIndex(x => x.name === currentFile);
    if (idx === -1) {
      return undefined;
    }
    const idxOfNextFile = idx + 1;
    if (allFiles.length - 1 >= idxOfNextFile) {
      return allFiles[idxOfNextFile].name;
    }
    return undefined;
  }

  private getPrevFile(currentFile: string, allFiles: ImageInfo[]): string | undefined {
    const idx = allFiles.findIndex(x => x.name === currentFile);
    if (idx === -1) {
      return undefined;
    }
    const idxOfPrevFile = idx - 1;
    if (idxOfPrevFile >= 0) {
      return allFiles[idxOfPrevFile].name;
    }
    return undefined;
  }
}
