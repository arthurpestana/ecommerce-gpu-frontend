import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
})
export class InputNumberComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() error = '';
  @Input() disabled = false;

  @Input() min = 0;
  @Input() max = 999999;
  @Input() step: number = 1;

  @Input() model: number = 0;
  @Output() modelChange = new EventEmitter<number>();

  updateValue(value: any) {
    const parsed = parseFloat(value);

    if (isNaN(parsed)) {
      this.model = 0;
      this.modelChange.emit(this.model);
      return;
    }

    let finalValue = Math.round(parsed * 100) / 100;;

    if (finalValue < this.min) finalValue = this.min;
    if (finalValue > this.max) finalValue = this.max;

    this.model = finalValue;
    this.modelChange.emit(this.model);
  }

  onIncrement() {
    const next = Math.round((this.model + this.step) * 100) / 100;
    this.updateValue(next);
  }

  onDecrement() {
    const next = Math.round((this.model - this.step) * 100) / 100;
    this.updateValue(next);
  }
}
