import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, LucideIconComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() label = '';
  @Input() removable = true;
  @Input() color: 'default' | 'primary' | 'secondary' | 'danger' = 'default';
  @Input() size: 'small' | 'medium' = 'medium';

  @Output() remove = new EventEmitter<void>();
  @Output() clicked = new EventEmitter<void>();

  onRemove(event: Event) {
    event.stopPropagation();
    this.remove.emit();
  }
}
