import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextAreaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() description: string = '';
  @Input() error: string = '';
  @Input() disabled = false;
  @Input() rows: number = 4;
  @Input() maxLength?: number;
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' = 'vertical';

  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  onInput(value: string) {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}
