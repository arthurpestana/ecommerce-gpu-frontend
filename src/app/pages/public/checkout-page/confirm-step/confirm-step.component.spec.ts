import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmStepComponent } from './confirm-step.component';

describe('ConfirmStepComponent', () => {
  let component: ConfirmStepComponent;
  let fixture: ComponentFixture<ConfirmStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
