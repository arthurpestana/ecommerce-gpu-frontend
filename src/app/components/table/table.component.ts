import { CommonModule } from '@angular/common';
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { PaginationComponent } from '../pagination/pagination.component';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (row: T, value: any) => string | number;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, LucideAngularModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() columns: TableColumn<any>[] = [];
  @Input() data: any[] = [];
  @Input() actions: boolean = false;

  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() pageChange = new EventEmitter<number>();

  @ContentChild('tableActions', { read: TemplateRef })
  actionTemplate!: TemplateRef<any>;

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  handlePageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }
}
