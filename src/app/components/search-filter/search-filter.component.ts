import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
  @Output() searchTextChange = new EventEmitter<string>();

  currentSearchText = '';

  emitSearchText(): void {
    this.searchTextChange.emit(this.currentSearchText);
  }

  clearSearch(): void {
    this.currentSearchText = '';
    this.emitSearchText();
  }
}