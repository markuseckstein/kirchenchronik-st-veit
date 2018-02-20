import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BellsComponent } from './bells.component';

describe('BellsComponent', () => {
  let component: BellsComponent;
  let fixture: ComponentFixture<BellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
