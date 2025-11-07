import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputMultiComponent } from './select-input-multi.component';

describe('SelectInputMultiComponent', () => {
  let component: SelectInputMultiComponent;
  let fixture: ComponentFixture<SelectInputMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectInputMultiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectInputMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
