import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideIconComponent, ButtonComponent],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
  currentSearchText = '';

  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<string>();
  @Input() showSubmitButton = true;
  @Input() placeholderText = 'Search...';
  @Input() variant: 'default' | 'small' | 'compact' = 'default';

  emitSearchText(): void {
    this.searchTextChange.emit(this.currentSearchText);
  }

  emitSearchClicked(): void {
    this.searchSubmit.emit(this.currentSearchText);
  }

  clearSearch(): void {
    this.currentSearchText = '';
    this.emitSearchText();
  }
}