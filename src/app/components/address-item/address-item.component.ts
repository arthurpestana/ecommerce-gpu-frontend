import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
}

@Component({
  selector: 'app-address-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css'],
})
export class AddressItemComponent {
  @Input({ required: true }) address!: Address;

  @Input() showActions = true;

  @Output() edit = new EventEmitter<Address>();
  @Output() delete = new EventEmitter<Address>();

  onEdit(): void {
    this.edit.emit(this.address);
  }

  onDelete(): void {
    this.delete.emit(this.address);
  }
}
