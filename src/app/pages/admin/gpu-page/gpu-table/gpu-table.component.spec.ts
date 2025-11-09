import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuTableComponent } from './gpu-table.component';

describe('GpuTableComponent', () => {
  let component: GpuTableComponent;
  let fixture: ComponentFixture<GpuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpuTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
