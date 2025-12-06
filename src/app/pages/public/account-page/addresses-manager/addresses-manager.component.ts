import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../components/button/button.component';
import { AlertDialogComponent } from '../../../../components/dialogs/alert-dialog/alert-dialog.component';

import { AddressQueryService } from '../../../../services/api/address/address-query/address-query.service';
import { AuthQueryService } from '../../../../services/api/auth/auth-query/auth-query.service';

import { AddressResponse } from '../../../../lib/interfaces/IAddress';
import { CepMaskPipe } from '../../../../lib/utils/cep-mask/cep-mask-pipe';
import { AddressFormComponent } from '../../../admin/user-page/address-manager/address-form/address-form.component';

@Component({
  selector: 'app-addresses-manager',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    AlertDialogComponent,
    AddressFormComponent
  ],
  templateUrl: './addresses-manager.component.html',
  styleUrls: ['./addresses-manager.component.css'],
})
export class AddressesManagerComponent implements OnInit {

  private readonly auth = inject(AuthQueryService);
  private readonly addressQuery = inject(AddressQueryService);

  user = this.auth.user();

  addresses = signal<AddressResponse[]>([]);
  
  formDialogOpen = signal(false);
  selectedAddress = signal<AddressResponse | null>(null);

  deleteDialogOpen = signal(false);
  selectedAddressToDelete = signal<AddressResponse | null>(null);

  ngOnInit() {
    if (this.user?.id) {
      this.addressQuery.setParams({ userId: this.user.id });
      this.addressQuery.listAddresses.refetch().then(res => {
        this.addresses.set(res.data?.items ?? []);
      });
    }
  }

  getZipCode(address: AddressResponse): string {
    return new CepMaskPipe().transform(address.zipCode);
  }

  openCreate() {
    this.selectedAddress.set(null);
    this.formDialogOpen.set(true);
  }

  openEdit(address: AddressResponse) {
    this.selectedAddress.set(address);
    this.formDialogOpen.set(true);
  }

  handleSaved() {
    this.formDialogOpen.set(false);
    this.addressQuery.listAddresses.refetch().then(res => {
      this.addresses.set(res.data?.items ?? []);
    });
  }

  openDelete(address: AddressResponse) {
    this.selectedAddressToDelete.set(address);
    this.deleteDialogOpen.set(true);
  }

  confirmDelete() {
    const addr = this.selectedAddressToDelete();
    if (!addr) return;

    this.addressQuery.deleteAddress.mutate(addr.id, {
      onSuccess: () => {
        this.deleteDialogOpen.set(false);

        this.addressQuery.listAddresses.refetch().then(res => {
          this.addresses.set(res.data?.items ?? []);
        });
      }
    });
  }
}
