import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../components/button/button.component';
import { OrderQueryService } from '../../../../services/api/order/order-query/order-query.service';
import { CartService } from '../../../../services/cart-service/cart-service.service';
import { PaymentMethod } from '../../../../lib/enums/PaymentMethod';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';
import { AddressResponse } from '../../../../lib/interfaces/IAddress';
import { Router } from '@angular/router';
import { FullLoadingComponent } from '../../../../components/full-loading/full-loading.component';

@Component({
    selector: 'app-confirm-step',
    standalone: true,
    imports: [CommonModule, ButtonComponent, FullLoadingComponent],
    templateUrl: './confirm-step.component.html',
    styleUrls: ['./confirm-step.component.css'],
})
export class ConfirmStepComponent {

    @Input() address!: AddressResponse;
    @Input() paymentMethod!: PaymentMethod;

    @Output() back = new EventEmitter<void>();
    @Output() success = new EventEmitter<string>();

    private readonly orderQuery = inject(OrderQueryService);
    private readonly cart = inject(CartService);
    private readonly auth = inject(AuthQueryService);
    private readonly router = inject(Router);

    isLoading = signal(false);

    getPaymentMethodName(): string {
        switch (this.paymentMethod) {
            case PaymentMethod.CREDIT_CARD: return 'Cartão de Crédito';
            case PaymentMethod.DEBIT_CARD: return 'Cartão de Débito';
            case PaymentMethod.BOLETO: return 'Boleto Bancário';
            case PaymentMethod.PIX: return 'PIX';
            default: return 'Desconhecido';
        }
    }

    async createOrder() {
        const user = this.auth.user();
        if (!user) return;

        this.isLoading.set(true);

        try {
            const start = Date.now();

            await this.orderQuery.createOrder.mutate({
                userId: user.id,
                addressId: this.address.id,
                paymentMethod: this.paymentMethod,
                items: this.cart.items().map(i => ({
                    gpuId: i.id,
                    quantity: i.quantity,
                    price: i.price
                })),
            });

            this.cart.clearCart();


            const elapsed = Date.now() - start;
            const remaining = Math.max(2000, 0) - elapsed;

            if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
            }

            await this.router.navigate(['/account'], {
                queryParams: { section: 'orders' }
            });

        } finally {
            this.isLoading.set(false);
        }
    }

}
