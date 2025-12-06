import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpuQueryService } from '../../../../services/api/gpu/gpu-query/gpu-query.service';
import { CategoryQueryService } from '../../../../services/api/category/category-query/category-query.service';
import { ManufacturerQueryService } from '../../../../services/api/manufacturer/manufacturer-query/manufacturer-query.service';

import { ButtonComponent } from '../../../../components/button/button.component';
import { InputRangeComponent } from '../../../../components/inputs/input-range/input-range.component';

@Component({
  selector: 'app-products-filters',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputRangeComponent],
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.css'],
})
export class ProductsFiltersComponent {
  private readonly gpuQuery = inject(GpuQueryService);
  private readonly categoryQuery = inject(CategoryQueryService);
  private readonly manufacturerQuery = inject(ManufacturerQueryService);

  selectedManufacturer = signal<string | null>(null);
  selectedCategory = signal<string | null>(null);
  maxPrice = signal<number>(18000);

  showAllManufacturers = signal(false);
  showAllCategories = signal(false);

  manufacturers = computed(() => this.manufacturerQuery.getListManufacturers.data()?.items ?? []);
  categories = computed(() => this.categoryQuery.getListCategories.data()?.items ?? []);

  limitedManufacturers = computed(() =>
    this.showAllManufacturers() ? this.manufacturers() : this.manufacturers().slice(0, 5)
  );

  limitedCategories = computed(() =>
    this.showAllCategories() ? this.categories() : this.categories().slice(0, 5)
  );

  constructor() {
    this.categoryQuery.getListCategories.refetch();
    this.manufacturerQuery.getListManufacturers.refetch();
  }

  setManufacturer(manufacturerId: string | null) {
    this.selectedManufacturer.set(manufacturerId);

    this.gpuQuery.setParams({
      manufacturerId: manufacturerId ?? undefined,
      page: 1,
    });
  }

  setCategory(categoryId: string | null) {
    this.selectedCategory.set(categoryId);

    this.gpuQuery.setParams({
      categoryId: categoryId ?? undefined,
      page: 1,
    });
  }

  updateMaxPrice(value: number) {
    this.maxPrice.set(value);

    this.gpuQuery.setParams({
      maxPrice: value,
      page: 1,
    });
  }

  resetFilters() {
    this.selectedManufacturer.set(null);
    this.selectedCategory.set(null);
    this.maxPrice.set(12000);

    this.gpuQuery.setParams({
      manufacturerId: undefined,
      categoryId: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      search: '',
      page: 1,
    });
  }
}
