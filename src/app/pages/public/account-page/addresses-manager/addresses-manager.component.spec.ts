import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesManagerComponent } from './addresses-manager.component';

describe('AddressesManagerComponent', () => {
  let component: AddressesManagerComponent;
  let fixture: ComponentFixture<AddressesManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressesManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
