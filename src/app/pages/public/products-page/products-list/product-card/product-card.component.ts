import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpuResponse } from '../../../../../lib/interfaces/IGpu';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { ToastService } from '../../../../../services/toast-service/toast-service.service';
import { CartService } from '../../../../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {

  private readonly cart = inject(CartService);

  @Input() gpu!: GpuResponse;

  isAddingToCart = signal(false);

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
    return (this.gpu.categories?.[0]?.name ?? 'Desconhecido').toUpperCase();
  }

  addToCart() {
    this.isAddingToCart.set(true);

    setTimeout(() => {
      this.cart.addToCart(this.gpu);
      this.isAddingToCart.set(false);
    }, 350);
  }
}
