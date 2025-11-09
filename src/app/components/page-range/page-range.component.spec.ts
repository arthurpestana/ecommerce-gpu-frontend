import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRangeComponent } from './page-range.component';

describe('PageRangeComponent', () => {
  let component: PageRangeComponent;
  let fixture: ComponentFixture<PageRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
