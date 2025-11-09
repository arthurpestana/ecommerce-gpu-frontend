import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
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
  @Input() mask = '';                // Ex.: '99.999.999/9999-99'
  @Input() disabled = false;
  @Input() error = '';
  @Input() description = '';

  @Input() onlyNumbers = false;
  @Input() maxDigits = 0;

  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  private getUnmaskedDigits(v: string): string {
    return (v ?? '').replace(/\D/g, '');
  }

  private applyMask(digits: string): string {
    if (!this.mask) return digits;

    let masked = '';
    let i = 0;
    for (const ch of this.mask) {
      if (ch === '9') {
        if (i < digits.length) masked += digits[i++];
        else break;
      } else {
        if (i < digits.length) masked += ch;
      }
    }
    return masked;
  }

  handleInput(value: string) {
    let digits = this.getUnmaskedDigits(value);

    if (this.maxDigits > 0 && digits.length > this.maxDigits) {
      digits = digits.slice(0, this.maxDigits);
    }

    if (this.onlyNumbers && !this.mask) {
      this.model = digits;
    } else {
      this.model = this.applyMask(digits);
    }

    this.modelChange.emit(this.model);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    const key = e.key;

    const controlKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight',
      'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End', 'Escape', 'Enter'
    ];
    if (controlKeys.includes(key) || e.ctrlKey || e.metaKey) return;

    if (this.onlyNumbers && !/^[0-9]$/.test(key)) {
      e.preventDefault();
      return;
    }

    if (this.mask && !/^[0-9]$/.test(key)) {
      e.preventDefault();
      return;
    }

    if (this.maxDigits > 0) {
      const currentDigits = this.getUnmaskedDigits(this.model);
      if (/^[0-9]$/.test(key) && currentDigits.length >= this.maxDigits) {
        e.preventDefault();
      }
    }
  }

}
