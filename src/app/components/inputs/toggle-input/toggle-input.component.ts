import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.css'],
})
export class ToggleInputComponent {
  @Input() label = '';
  @Input() description = '';
  @Input() disabled = false;
  @Input() error = '';

  @Input() model: boolean = false;
  @Output() modelChange = new EventEmitter<boolean>();

  onToggleInput() {
    if (this.disabled) return;

    this.model = !this.model;
    this.modelChange.emit(this.model);
  }
}
