import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, icons } from 'lucide-angular';


type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large' | 'square' | 'none';
type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<void>();

  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() iconPosition: IconPosition = 'left';

  public isIconOnly(): boolean {
    return !!this.icon && !this.hasContent;
  }

  hasContent = true;

  onButtonClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }

  onContentInit() {

  }
}
