import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  CircleCheck,
  CircleX,
  TriangleAlert,
  Info,
  LoaderCircle
} from 'lucide-angular';

import { Toast } from '../../../services/toast-service/toast-service.service';
import { LucideIconComponent } from '../../lucide-icon/lucide-icon.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    LucideIconComponent,
    ButtonComponent
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input() toast!: Toast;
  @Output() close = new EventEmitter<void>();

  get getIcon() {
    switch (this.toast.type) {
      case 'success': return CircleCheck;
      case 'error': return CircleX;
      case 'warning': return TriangleAlert;
      case 'info': return Info;
      case 'loading': return LoaderCircle;
      default: return Info;
    }
  }

  get isLoading() {
    return this.toast.type === 'loading';
  }
}
