import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerPageComponent } from './manufacturer-page.component';

describe('ManufacturerPageComponent', () => {
  let component: ManufacturerPageComponent;
  let fixture: ComponentFixture<ManufacturerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
