import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ButtonComponent],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.css']
})
export class InputPasswordComponent {

  readonly eye = Eye;
  readonly eyeOff = EyeOff;

  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = '';
  @Input() description = '';

  @Input() model: string = '';
  @Output() modelChange = new EventEmitter<string>();

  show = false;

  toggle() {
    this.show = !this.show;
  }

  update(value: string) {
    this.model = value;
    this.modelChange.emit(this.model);
  }
}
