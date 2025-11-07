import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

  @Input() open = false;
  @Input() title = 'Atenção';
  @Input() subtitle = 'Confirme a ação abaixo';
  @Input() message = 'Tem certeza dessa ação?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';

  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
    this.open = false;
  }

  onCancel() {
    this.closed.emit();
    this.open = false;
  }
}
