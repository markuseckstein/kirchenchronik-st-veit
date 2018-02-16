import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DATA_PROVIDER } from '../../providers';

@Component({
  selector: 'kc-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
  public category: string | null;
  public images: string[] = [];

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
  }

  getFullImageUrl(file: string): string {
    return `assets/Kirchenchronik/${this.category}/${file}`;
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
