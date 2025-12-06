import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../../../components/button/button.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { AddressQueryService } from '../../../../services/api/address/address-query/address-query.service';
import { AddressResponse } from '../../../../lib/interfaces/IAddress';
import { LucideIconComponent } from '../../../../components/lucide-icon/lucide-icon.component';
import { DialogComponent } from '../../../../components/dialogs/dialog/dialog.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { AlertDialogComponent } from '../../../../components/dialogs/alert-dialog/alert-dialog.component';
import { CepMaskPipe } from '../../../../lib/utils/cep-mask/cep-mask-pipe';

@Component({
  selector: 'app-address-manager',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    ButtonComponent,
    AlertDialogComponent,
    AddressFormComponent
  ],
  templateUrl: './address-manager.component.html',
  styleUrl: './address-manager.component.css'
})
export class AddressManagerComponent {

  private readonly addressQuery = inject(AddressQueryService);

  @Input() open = false;
  @Input() userId: string | null = null;
  @Input() userName: string | null = null;

  @Output() close = new EventEmitter<void>();

  addresses = signal<AddressResponse[]>([]);
  formDialogOpen = signal(false);
  selectedAddress = signal<AddressResponse | null>(null);

  deleteDialogOpen = signal(false);
  selectedAddressToDelete = signal<AddressResponse | null>(null);

  ngOnChanges() {
    if (this.userId) {
      this.addressQuery.setParams({ userId: this.userId });

      this.addressQuery.listAddresses.refetch().then((res) => {
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

  openDelete(address: AddressResponse) {
    this.selectedAddressToDelete.set(address);
    this.deleteDialogOpen.set(true);
  }

  confirmDelete() {
    const addr = this.selectedAddressToDelete();
    if (!addr) return;

    this.addressQuery.deleteAddress.mutate(addr.id);
    this.deleteDialogOpen.set(false);
    this.ngOnChanges();
  }

  handleSaved() {
    this.formDialogOpen.set(false);
    this.ngOnChanges();
  }
}
