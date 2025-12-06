import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { CartService } from '../../../../services/cart-service/cart-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from '../../../../components/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../../../components/cart-summary/cart-summary.component';
import { ButtonComponent } from '../../../../components/button/button.component';
import { CheckoutStepsComponent } from '../../../../components/checkout-steps/checkout-steps.component';
import { LucideIconComponent } from '../../../../components/lucide-icon/lucide-icon.component';
import { AuthService } from '../../../../services/api/auth/auth-service/auth.service';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';


@Component({
    selector: 'app-cart-step',
    imports: [CommonModule, CartItemComponent, CartSummaryComponent, ButtonComponent, LucideIconComponent],
    templateUrl: './cart-step.component.html',
    styleUrl: './cart-step.component.css',
})
export class CartStepComponent {
    @Output() back = new EventEmitter<void>();
    @Output() next = new EventEmitter<string>();

    private readonly cart = inject(CartService);
    private readonly authQuery = inject(AuthQueryService);
    private readonly router = inject(Router);

    items = computed(() => this.cart.items());
    totalPrice = computed(() => this.cart.totalPrice());
    totalQuantity = computed(() => this.cart.totalItems());

    clear() {
        this.cart.clearCart();
    }

    isDisabled() {
        const user = this.authQuery.user();
        const token = this.authQuery.token();

        return !token || !user
    }
}
