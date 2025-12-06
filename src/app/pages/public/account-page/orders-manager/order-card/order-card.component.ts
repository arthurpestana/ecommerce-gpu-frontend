import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../components/button/button.component';
import { LucideIconComponent } from '../../../../../components/lucide-icon/lucide-icon.component';
import { OrderResponse } from '../../../../../lib/interfaces/IOrder';
import { OrderStatus } from '../../../../../lib/enums/OrderStatus';

@Component({
    selector: 'app-order-card',
    standalone: true,
    imports: [CommonModule, ButtonComponent, LucideIconComponent],
    templateUrl: './order-card.component.html',
    styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {

    @Input() order!: OrderResponse;

    @Output() open = new EventEmitter<void>();

    getOrderStatus(): string {
        const statusMap = new Map<OrderStatus, string>([
            [OrderStatus.PROCESSING, 'Aprovado'],
            [OrderStatus.PENDING_PAYMENT, 'Aguardando Pagamento'],
            [OrderStatus.CANCELED, 'Cancelado'],
            [OrderStatus.DELIVERED, 'Entregue'],
            [OrderStatus.PAID, 'Pago'],
            [OrderStatus.PAYMENT_FAILED, 'Pagamento Falhou'],
            [OrderStatus.SHIPPED, 'Enviado'],
        ]);

        return statusMap.get(this.order.orderStatus) || 'Desconhecido';
    }
}
