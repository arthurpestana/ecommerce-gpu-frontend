import { Component, EventEmitter, inject, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressQueryService } from '../../../../services/api/address/address-query/address-query.service';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';
import { ButtonComponent } from '../../../../components/button/button.component';
import { CepMaskPipe } from '../../../../lib/utils/cep-mask/cep-mask-pipe';
import { AddressItemComponent } from '../../../../components/address-item/address-item.component';
import { AddressResponse } from '../../../../lib/interfaces/IAddress';

@Component({
  selector: 'app-address-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AddressItemComponent],
  templateUrl: './address-step.component.html',
  styleUrls: ['./address-step.component.css'],
})
export class AddressStepComponent {

  private readonly auth = inject(AuthQueryService);
  private readonly addressQuery = inject(AddressQueryService);

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<AddressResponse>();

  selectedAddress: AddressResponse | null = null;

  addresses = computed(() => this.addressQuery.listAddresses.data()?.items ?? []);

  constructor() {
    const user = this.auth.user();
    if (user?.id) {
      this.addressQuery.setParams({ userId: user.id });
      this.addressQuery.listAddresses.refetch();
    }
  }

  selectAddress(address: AddressResponse) {
    this.selectedAddress = address;
  }

  continue() {
    if (this.selectedAddress) {
      this.next.emit(this.selectedAddress);
    }
  }

  getZipCode(address: any): string {
    return new CepMaskPipe().transform(address.zipCode);
  }
}
