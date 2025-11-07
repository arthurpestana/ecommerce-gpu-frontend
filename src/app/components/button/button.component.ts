import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';


type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large' | 'square' | 'none' | 'square-small';
type IconPosition = 'left' | 'right';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [LucideIconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter<Event>();

  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() iconSize: number | string = 20;
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() iconPosition: IconPosition = 'left';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

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
