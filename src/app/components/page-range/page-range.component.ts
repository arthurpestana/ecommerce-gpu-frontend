import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-range',
  imports: [],
  templateUrl: './page-range.component.html',
  styleUrl: './page-range.component.css',
})
export class PageRangeComponent {
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 0;

  getProductsRangeStart() {
    return (this.currentPage - 1) * this.limit + 1;
  }

  getProductsRangeEnd() {
    return Math.min(this.currentPage * this.limit, this.totalItems);
  }
}
