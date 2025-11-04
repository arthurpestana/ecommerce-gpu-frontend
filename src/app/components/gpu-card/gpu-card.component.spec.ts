import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpuCardComponent } from './gpu-card.component';

describe('GpuCardComponent', () => {
  let component: GpuCardComponent;
  let fixture: ComponentFixture<GpuCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpuCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpuCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
