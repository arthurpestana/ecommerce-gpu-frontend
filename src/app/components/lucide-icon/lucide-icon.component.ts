import { Component, Input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-lucide-icon',
  imports: [LucideAngularModule],
  templateUrl: './lucide-icon.component.html',
  styleUrl: './lucide-icon.component.css',
})
export class LucideIconComponent {
  @Input() icon?: string | LucideIconData;
}
