import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../../../../lib/interfaces/ICategory';
import { categoryRequestSchema } from '../../../../lib/schemas/category.schema';
import { ToastService } from '../../../../services/toast-service/toast-service.service';

import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { TextAreaComponent } from '../../../../components/textarea/textarea.component';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    TextAreaComponent
  ],
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  private readonly toast = inject(ToastService);

  @Input() open = false;
  @Input() category: CategoryResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<CategoryRequest>();

  form: CategoryRequest = { name: '', description: '' };

  ngOnChanges() {
    if (this.category) {
      this.form = {
        name: this.category.name,
        description: this.category.description,
      };
    } else {
      this.form = { name: '', description: '' };
    }
  }

  submit() {
    const parsed = categoryRequestSchema.safeParse(this.form);

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors).forEach(errs =>
        errs?.forEach(msg => this.toast.error(msg))
      );
      return;
    }

    this.submitForm.emit(parsed.data);
  }
}
