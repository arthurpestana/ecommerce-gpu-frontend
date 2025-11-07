import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDivComponent } from './container-div.component';

describe('ContainerDivComponent', () => {
  let component: ContainerDivComponent;
  let fixture: ComponentFixture<ContainerDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerDivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
