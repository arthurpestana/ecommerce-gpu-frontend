import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';
import { GpuResponse } from '../../../../lib/interfaces/IGpu';


@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [
        CommonModule,
        ProductCardComponent,
        PaginationComponent,
        PageRangeComponent
    ],
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

    @Input() items: GpuResponse[] = [];
    @Input() isLoading = false;
    @Input() error: any = null;

    @Input() totalItems = 0;
    @Input() currentPage = 1;
    @Input() totalPages = 1;
    @Input() limit = 10;

    @Input() pageChange: (page: number) => void = () => { };
}
