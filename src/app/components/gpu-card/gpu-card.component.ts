import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { GpuResponse } from '../../lib/interfaces/IGpu';

@Component({
  selector: 'app-gpu-card',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './gpu-card.component.html',
  styleUrls: ['./gpu-card.component.css'],
})
export class GpuCardComponent {
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
    if (!this.gpu.categories?.length) return 'MÉDIO';
    const cat = this.gpu.categories[0].name.toLowerCase();
    switch (cat) {
      case 'flagship': return 'TOPO';
      case 'high-end': return 'ALTO';
      default: return 'MÉDIO';
    }
  }
}
