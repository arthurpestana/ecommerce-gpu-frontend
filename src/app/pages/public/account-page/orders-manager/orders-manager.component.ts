import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderQueryService } from '../../../../services/api/order/order-query/order-query.service';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';

import { OrderCardComponent } from './order-card/order-card.component';

@Component({
  selector: 'app-orders-manager',
  standalone: true,
  imports: [
    CommonModule,
    OrderCardComponent
  ],
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.css'],
})
export class OrdersManagerComponent {

  private readonly auth = inject(AuthQueryService);
  private readonly orderQuery = inject(OrderQueryService);

  selectedOrderId = signal<string | null>(null);

  orders = computed(() => this.orderQuery.listOrders.data()?.items ?? []);

  ngOnInit() {
    const user = this.auth.user();
    if (user?.id) {
      this.orderQuery.setParams({ userId: user.id });
      this.orderQuery.listOrders.refetch();
    }
  }

  openDetails(id: string) {
    this.selectedOrderId.set(id);
  }

  closeDetails() {
    this.selectedOrderId.set(null);
  }
}
