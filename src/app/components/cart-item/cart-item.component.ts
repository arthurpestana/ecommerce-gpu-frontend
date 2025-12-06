import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ButtonComponent } from '../button/button.component';
import { CartService } from '../../services/cart-service/cart-service.service';
import { CartItem } from '../../lib/interfaces/ICart';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

    private readonly cart = inject(CartService);

    @Input() item!: CartItem;

    increase() {
        this.cart.increaseQty(this.item.id);
    }

    decrease() {
        this.cart.decreaseQty(this.item.id);
    }

    remove() {
        this.cart.removeItem(this.item.id);
    }
}
