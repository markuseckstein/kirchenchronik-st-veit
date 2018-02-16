import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DATA_PROVIDER } from '../../providers';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import * as exif from 'exif-js';

@Component({
  selector: 'kc-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit,  OnDestroy {
  public src: string | null | undefined;
  public category: string | null | undefined;
  public imageDescription: string | undefined;
  public imageUrl: string | undefined;
  public imageUrlStyle: SafeStyle | undefined;
  private subscription = Subscription.EMPTY;

  constructor(
    private router: Router,
    @Inject(DATA_PROVIDER) private data: any,
    activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer
  ) {
    this.subscription = activatedRoute.paramMap
      .subscribe((params: ParamMap) => {
        this.src = params.get('file');
        this.category = params.get('category');
        this.imageUrl = `assets/Kirchenchronik/${this.category}/${this.src}`;
        this.imageUrlStyle = sanitizer.bypassSecurityTrustStyle(`url('${this.imageUrl}')`);
        this.imageDescription = this.imageUrl;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  imageLoaded(): void {
    console.log('Loaded!');
    const img = document.getElementById('hiddenImg');
    exif.getData(img, function() {
      const all = exif.getAllTags((this as any));
      console.log('all', all);
    });
  }

  private getNextFile(currentFile: string, allFiles: string[]): string | undefined {
    const idx = allFiles.findIndex(x => x === currentFile);
    if (idx === -1) {
      return undefined;
    }
    const idxOfNextFile = idx + 1;
    if (allFiles.length - 1 >= idxOfNextFile) {
      return allFiles[idxOfNextFile];
    }
    return undefined;
  }

  private getPrevFile(currentFile: string, allFiles: string[]): string | undefined {
    const idx = allFiles.findIndex(x => x === currentFile);
    if (idx === -1) {
      return undefined;
    }
    const idxOfPrevFile = idx - 1;
    if (idxOfPrevFile >= 0) {
      return allFiles[idxOfPrevFile];
    }
    return undefined;
  }
}
