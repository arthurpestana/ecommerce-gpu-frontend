import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-range.component.html',
  styleUrls: ['./input-range.component.css'],
})
export class InputRangeComponent {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() error: string = '';

  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;

  @Input() showValue: boolean = true;

  @Input() model: number = 0;
  @Output() modelChange = new EventEmitter<number>();

  @Output() changeEnd = new EventEmitter<number>();

  onInput(value: number) {
    this.model = value;
    this.modelChange.emit(this.model);
  }

  @HostListener('mouseup')
  @HostListener('touchend')
  onEnd() {
    this.changeEnd.emit(this.model);
  }
}
