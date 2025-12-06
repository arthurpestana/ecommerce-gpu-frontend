import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-range',
  templateUrl: './page-range.component.html',
  styleUrls: ['./page-range.component.css'],
})
export class PageRangeComponent {
  @Input() currentPage: number = 1;
  @Input() limit: number = 10;
  @Input() totalItems: number = 0;

  getProductsRangeStart() {
    return this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.limit + 1;
  }

  getProductsRangeEnd() {
    return this.totalItems === 0 ? 0 : Math.min(this.currentPage * this.limit, this.totalItems);
  }
}
