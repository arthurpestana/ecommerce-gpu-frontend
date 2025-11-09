import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { AlertDialogComponent } from '../../../components/dialogs/alert-dialog/alert-dialog.component';

import { ToastService } from '../../../services/toast-service/toast-service.service';

import { CategoryResponse, CategoryRequest } from '../../../lib/interfaces/ICategory';
import { categoryRequestSchema } from '../../../lib/schemas/category.schema';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryQueryService } from '../../../services/api/category/category-query/category-query.service';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertDialogComponent,
    CategoryFormComponent,
    CategoryTableComponent
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css',
})
export class CategoryPageComponent {
  private readonly categoryQuery = inject(CategoryQueryService);
  private readonly toast = inject(ToastService);

  createOrEditDialogOpen = false;
  deleteDialogOpen = false;

  selectedCategory: CategoryResponse | null = null;

  onCreate() {
    this.selectedCategory = null;
    this.createOrEditDialogOpen = true;
  }

  onEdit(category: CategoryResponse) {
    this.selectedCategory = category;
    this.createOrEditDialogOpen = true;
  }

  onDelete(category: CategoryResponse) {
    this.selectedCategory = category;
    this.deleteDialogOpen = true;
  }

  confirmDelete() {
    if (!this.selectedCategory) return;

    this.categoryQuery.deleteCategory.mutate(this.selectedCategory.id, {
      onSuccess: () => {
        this.deleteDialogOpen = false;
      },
      onError: () => {
        this.toast.error("Erro ao excluir categoria");
      }
    });
  }

  handleSubmit(payload: CategoryRequest) {

    if (this.selectedCategory) {
      this.categoryQuery.updateCategory.mutate(
        { id: this.selectedCategory.id, data: payload },
        {
          onSuccess: () => {
            this.createOrEditDialogOpen = false;
          }
        }
      );
      return;
    }

    this.categoryQuery.createCategory.mutate(
      payload,
      {
        onSuccess: () => {
          this.createOrEditDialogOpen = false;
        }
      }
    );
  }
}
