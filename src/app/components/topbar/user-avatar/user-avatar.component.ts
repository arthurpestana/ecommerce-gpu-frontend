import { Component, Input, Output, EventEmitter, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-user-avatar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css'
})
export class UserAvatarComponent {

  @Input() name: string = '';
  @Output() selectProfile = new EventEmitter<void>();
  @Output() selectLogout = new EventEmitter<void>();

  dropdownOpen = signal(false);

  get initials(): string {
    return this.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-avatar')) this.closeDropdown();
  }
}
