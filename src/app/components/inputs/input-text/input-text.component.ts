import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() description: string = '';
  @Input() error: string = '';
  @Input() iconLeft?: any;
  @Input() iconRight?: any;

  @Input() type: string = 'text';
  @Input() disabled = false;

  @Input() model: any = '';
  @Output() modelChange = new EventEmitter<any>();

  onInput(value: any) {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}
