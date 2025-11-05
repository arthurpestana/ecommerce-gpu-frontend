import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, X } from 'lucide-angular';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ButtonComponent],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent {
  readonly searchIcon = Search;
  readonly clearIcon = X;

  currentSearchText = '';

  @Output() searchTextChange = new EventEmitter<string>();
  @Output() searchSubmit = new EventEmitter<string>();

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