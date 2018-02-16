import { Component, OnInit, Inject } from '@angular/core';
import { DATA_PROVIDER } from '../providers';

@Component({
  selector: 'kc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public categories: string[] = [];


  constructor(@Inject(DATA_PROVIDER) private data: any) { }

  ngOnInit() {
    this.categories = Object.keys(this.data);
  }

}
