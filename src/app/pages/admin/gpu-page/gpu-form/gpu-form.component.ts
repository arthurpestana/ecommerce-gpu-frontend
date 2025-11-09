import { Component, Input, Output, EventEmitter, ViewChild, inject, computed } from '@angular/core';
import { GpuRequest, GpuResponse } from '../../../../lib/interfaces/IGpu';
import { gpuRequestSchema } from '../../../../lib/schemas/gpu.schema';
import { FileInputComponent } from '../../../../components/inputs/file-input/file-input.component';
import { ImageResponse } from '../../../../lib/interfaces/IImage';
import { ToastService } from '../../../../services/toast-service/toast-service.service';
import { FormDialogComponent } from '../../../../components/dialogs/form-dialog/form-dialog.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { InputTextComponent } from '../../../../components/inputs/input-text/input-text.component';
import { InputNumberComponent } from '../../../../components/inputs/input-number/input-number.component';
import { TextAreaComponent } from '../../../../components/textarea/textarea.component';
import { SelectInputComponent, SelectOption } from '../../../../components/inputs/select-input/select-input.component';
import { SelectInputMultiComponent } from '../../../../components/inputs/select-input-multi/select-input-multi.component';
import { TagInputComponent } from '../../../../components/inputs/tag-input/tag-input.component';
import { FileItemComponent } from '../../../../components/file-item/file-item.component';
import { ToggleInputComponent } from '../../../../components/inputs/toggle-input/toggle-input.component';
import { CategoryQueryService } from '../../../../services/api/category/category-query/category-query.service';
import { ModelQueryService } from '../../../../services/api/model/model-query/model-query.service';

@Component({
  selector: 'app-gpu-form',
  standalone: true,
  imports: [
    FormDialogComponent,
    ContainerDivComponent,
    InputTextComponent,
    InputNumberComponent,
    TextAreaComponent,
    SelectInputComponent,
    SelectInputMultiComponent,
    TagInputComponent,
    FileInputComponent,
    FileItemComponent,
  ],
  templateUrl: './gpu-form.component.html',
})
export class GpuFormComponent {
  private readonly categoryQuery = inject(CategoryQueryService);
  private readonly modelQuery = inject(ModelQueryService)
  private readonly toast = inject(ToastService);

  @Input() open = false;
  @Input() gpu: GpuResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<{
    payload: GpuRequest;
    images: File[];
    deleteImages: string[];
  }>();

  @ViewChild(FileInputComponent) fileInput!: FileInputComponent;

  existingImages: ImageResponse[] = [];
  imagesToDelete: string[] = [];
  uploadImages: File[] = [];
  technologyTags: string[] = [];

  form: GpuRequest = {
    name: '',
    description: '',
    price: 0,
    isActive: true,
    availableQuantity: 0,
    memory: 0,
    architecture: '',
    energyConsumption: 0,
    modelId: null,
    technologies: [],
    categoryIds: [],
  };

  modelOptions = computed<SelectOption[]>(() => {
    const data = this.modelQuery.getListModels.data();
    console.log(data);
    if (!data) return [];

    return data.items.map(m => ({
      value: m.id,
      label: m.name
    }));
  });

  categoryOptions = computed<SelectOption[]>(() => {
    const data = this.categoryQuery.getListCategories.data();
    console.log(data);
    if (!data) return [];

    return data.items.map(c => ({
      value: c.id,
      label: c.name
    }));
  });

  ngOnChanges() {
    queueMicrotask(() => this.fileInput?.reset());

    if (this.gpu) {
      this.form = {
        name: this.gpu.name,
        description: this.gpu.description,
        price: this.gpu.price,
        isActive: this.gpu.isActive,
        availableQuantity: this.gpu.availableQuantity,
        memory: this.gpu.memory,
        architecture: this.gpu.architecture,
        energyConsumption: this.gpu.energyConsumption,
        modelId: String(this.gpu.model.id),
        technologies: this.gpu.technologies.map(t => ({ name: t.name, description: '' })),
        categoryIds: this.gpu.categories.map(c => String(c.id)),
      };

      this.existingImages = [...this.gpu.images];
      this.uploadImages = [];
      this.imagesToDelete = [];
      this.technologyTags = this.gpu.technologies.map(t => t.name);

    } else {
      this.form = {
        name: '',
        description: '',
        price: 0,
        isActive: true,
        availableQuantity: 0,
        memory: 0,
        architecture: '',
        energyConsumption: 0,
        modelId: null,
        technologies: [],
        categoryIds: [],
      };
      this.existingImages = [];
      this.uploadImages = [];
      this.imagesToDelete = [];
      this.technologyTags = [];
    }
  }

  removeExistingImage(img: ImageResponse) {
    this.imagesToDelete.push(img.id);
    this.existingImages = this.existingImages.filter(i => i.id !== img.id);
  }

  submit() {
    const parsed = gpuRequestSchema.safeParse({
      ...this.form,
      technologies: this.technologyTags.map(t => ({ name: t, description: '' }))
    });

    if (!parsed.success) {
      Object.values(parsed.error.flatten().fieldErrors).forEach(errs => {
        errs?.forEach(msg => this.toast.error(msg));
      });
      return;
    }

    this.submitForm.emit({
      payload: parsed.data,
      images: this.uploadImages,
      deleteImages: this.imagesToDelete,
    });
  }
}
