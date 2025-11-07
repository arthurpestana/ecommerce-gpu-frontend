import { Component, EventEmitter, Input, Output, HostListener, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input() open = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() width: string = '420px';
  @Input() disableBackdropClose: boolean = false;

  @Output() closed = new EventEmitter<void>();

  closeDialog() {
    this.closed.emit();
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.open) this.closeDialog();
  }
}
