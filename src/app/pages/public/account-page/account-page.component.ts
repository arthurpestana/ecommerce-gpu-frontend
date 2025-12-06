import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthQueryService } from '../../../services/api/auth/auth-query/auth-query.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { SettingsManagerComponent } from './settings-manager/settings-manager.component';
import { AddressesManagerComponent } from './addresses-manager/addresses-manager.component';
import { OrdersManagerComponent } from './orders-manager/orders-manager.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-account-page',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        SettingsManagerComponent,
        AddressesManagerComponent,
        OrdersManagerComponent
    ],
    templateUrl: './account-page.component.html',
    styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {

    private readonly auth = inject(AuthQueryService);
    private readonly route = inject(ActivatedRoute);

    user = computed(() => this.auth.user());

    section = signal<'settings' | 'addresses' | 'orders'>('settings');

    constructor() {
        const section = this.route.snapshot.queryParamMap.get('section');
        if (section === 'orders' || section === 'addresses' || section === 'settings') {
            this.section.set(section);
        }
    }

    goToSettings() { this.section.set('settings'); }
    goToAddresses() { this.section.set('addresses'); }
    goToOrders() { this.section.set('orders'); }
}
