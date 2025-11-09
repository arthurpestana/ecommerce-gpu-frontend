import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpuResponse } from '../../lib/interfaces/IGpu';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() gpu!: GpuResponse;

  get manufacturer(): string {
    return this.gpu.model?.manufacturer.name ?? 'Desconhecido';
  }

  get image(): string {
    return this.gpu.images?.[0]?.url ?? '/placeholder-gpu.png';
  }

  get memory(): string {
    return `${this.gpu.memory} GB`;
  }

  get power(): string {
    return `${this.gpu.energyConsumption} W`;
  }

  get categoryLabel(): string {
    const category = this.gpu.categories?.[0]?.name ?? 'Desconhecido';
    return category.toUpperCase();
  }
}
