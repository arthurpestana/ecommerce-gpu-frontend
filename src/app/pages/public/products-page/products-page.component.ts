import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { ProductsFiltersComponent } from './products-filters/products-filters.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { GpuQueryService } from '../../../services/api/gpu/gpu-query/gpu-query.service';

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [
        CommonModule,
        SearchFilterComponent,
        ProductsFiltersComponent,
        ProductsListComponent
    ],
    templateUrl: './products-page.component.html',
    styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

    private readonly gpuQuery = inject(GpuQueryService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);

    constructor() {
        this.route.queryParams.subscribe(params => {
            const search = params['search'] ?? '';

            this.gpuQuery.setParams({
                search,
                page: 1
            });
        });
    }

    onSearch(value: string) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: value || null },
            queryParamsHandling: 'merge'
        });
    }

    onPageChange(newPage: number) {
        this.gpuQuery.setParams({ page: newPage });
    }

    listGpus = this.gpuQuery.getListGpus;
    get isError() {
        return this.listGpus.isError();
    }
    get dataGpus() { return this.listGpus.data()?.items ?? []; }
    get isLoading() { return this.listGpus.isLoading(); }
    get totalItems() { return this.listGpus.data()?.total ?? 0; }
    get limit() { return this.listGpus.data()?.limit ?? 10; }
    get currentPage() { return (this.listGpus.data()?.page ?? 0) + 1; }
    get totalPages() { return Math.ceil(this.totalItems / this.limit); }
}
