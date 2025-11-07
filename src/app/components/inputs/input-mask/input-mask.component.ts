import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-mask',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.css']
})
export class InputMaskComponent {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() mask = ''; // Ex: '999.999.999-99'
  @Input() disabled = false;
  @Input() error = '';
  @Input() description = '';

  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  handleInput(value: string) {
    this.model = this.applyMask(value);
    this.modelChange.emit(this.model);
  }

  applyMask(value: string): string {
    let digits = value.replace(/\D/g, '');
    let masked = '';
    let idx = 0;

    for (let char of this.mask) {
      if (char === '9') {
        if (digits[idx]) masked += digits[idx++];
        else break;
      } else {
        if (digits[idx]) masked += char;
      }
    }

    return masked;
  }
}
