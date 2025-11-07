import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent {

  @Input() open = false;
  @Input() title = 'Formulário';
  @Input() subtitle = 'Preencha os campos abaixo';
  @Input() submitText = 'Salvar';
  @Input() cancelText = 'Cancelar';

  @Output() submitted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  onSubmit() {
    this.submitted.emit();
  }

  onCancel() {
    this.closed.emit();
    this.open = false;
  }
}
