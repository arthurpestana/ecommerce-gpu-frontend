import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit() {
    console.log(this.totalPages, "totalPages");
    console.log(this.currentPage, "currentPage");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];

    pages.push(1);

    const start = Math.max(2, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);

    if (start > 2) {
      pages.push(-1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages - 1) {
      pages.push(-1);
    }

    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }

}