import { Component, inject } from '@angular/core';
import { TableComponent, TableColumn } from '../../../../components/table/table.component';
import { SearchFilterComponent } from '../../../../components/search-filter/search-filter.component';
import { ContainerDivComponent } from '../../../../components/container-div/container-div.component';
import { PageRangeComponent } from '../../../../components/page-range/page-range.component';
import { InventoryTransactionResponse, TransactionTypes } from '../../../../lib/interfaces/IInventory';
import { InventoryTransactionQueryService } from '../../../../services/api/inventory/inventory-query/inventory-transaction-query.service';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    TableComponent,
    SearchFilterComponent,
    ContainerDivComponent,
    PageRangeComponent,
  ],
  templateUrl: './inventory-table.component.html'
})
export class InventoryTableComponent {
  private readonly inventoryQuery = inject(InventoryTransactionQueryService);

  listTransactions = this.inventoryQuery.getListTransactions;

  columns: TableColumn<InventoryTransactionResponse>[] = [];

  ngOnInit() {
    this.columns = [
      {
        key: 'gpu',
        label: 'GPU',
        width: '220px',
        formatter: (_, v) => v.name,
      },
      {
        key: 'quantity',
        label: 'Quantidade',
        width: '120px',
        align: 'center',
      },
      {
        key: 'transactionType',
        label: 'Tipo',
        width: '120px',
        align: 'center',
        formatter: (_, v) =>
          v === TransactionTypes.ADD ? 'Entrada' : v === TransactionTypes.REMOVE ? 'Saída' : v,
      },
      {
        key: 'transactionDate',
        label: 'Data',
        formatter: (_, v) =>
          new Date(v).toLocaleString('pt-BR'),
      },
      {
        key: 'reason',
        label: 'Motivo',
        formatter: (_, v) => v ?? '—'
      },
    ];
  }

  onSearch(value: string) {
    this.inventoryQuery.setParams({ page: 1 });
  }

  onPageChange(page: number) {
    this.inventoryQuery.setParams({ page });
  }

  get data() {
    return this.listTransactions.data()?.items ?? [];
  }

  get totalItems() {
    return this.listTransactions.data()?.total ?? 0;
  }

  get limit() {
    return this.listTransactions.data()?.limit ?? 10;
  }

  get currentPage() {
    const data = this.listTransactions.data();
    if (!data) return 1;
    return (data.page ?? 0) + 1;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.limit);
  }
}
