import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutStepsComponent } from '../../../components/checkout-steps/checkout-steps.component';
import { CartService } from '../../../services/cart-service/cart-service.service';
import { AddressStepComponent } from './address-step/address-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { ConfirmStepComponent } from './confirm-step/confirm-step.component';
import { CartStepComponent } from './cart-step/cart-step.component';
import { Router } from '@angular/router';
import { PaymentMethod } from '../../../lib/enums/PaymentMethod';
import { AddressResponse } from '../../../lib/interfaces/IAddress';

@Component({
    selector: 'app-checkout-page',
    standalone: true,
    imports: [
        CommonModule,
        CheckoutStepsComponent,
        AddressStepComponent,
        PaymentStepComponent,
        CartStepComponent,
        ConfirmStepComponent
    ],
    templateUrl: './checkout-page.component.html',
    styleUrls: ['./checkout-page.component.css'],
})
export class CheckoutPageComponent {

    private readonly cart = inject(CartService);
    private readonly router = inject(Router);

    currentStep = signal<'cart' | 'address' | 'payment' | 'complete'>('cart');

    items = computed(() => this.cart.items());
    total = computed(() => this.cart.totalPrice());
    quantity = computed(() => this.cart.totalItems());

    selectedAddress = signal<AddressResponse | null>(null);
    selectedPaymentMethod = signal<PaymentMethod | null>(null);

    goToProducts() {
        this.router.navigate(['/']);
    }
    goToCart() { this.currentStep.set('cart'); }
    goToAddress() { this.currentStep.set('address'); }
    goToPayment(address?: AddressResponse) {
        if (address) this.selectedAddress.set(address);
        this.currentStep.set('payment');
    }

    goToConfirm(method?: PaymentMethod) {
        if (method) this.selectedPaymentMethod.set(method);
        this.currentStep.set('complete');
    }
    goToComplete() { this.currentStep.set('complete'); }

    clearCart() {
        this.cart.clearCart();
    }
}
