import { Component, EventEmitter, Output, TemplateRef, ViewChild, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchFilterComponent } from "../../../../components/search-filter/search-filter.component";
import { PageRangeComponent } from "../../../../components/page-range/page-range.component";
import { TableColumn, TableComponent } from "../../../../components/table/table.component";
import { ButtonComponent } from "../../../../components/button/button.component";
import { ContainerDivComponent } from "../../../../components/container-div/container-div.component";
import { UserQueryService } from "../../../../services/api/user/user-query/user-query.service";
import { UserResponse } from "../../../../lib/interfaces/IUser";
import { ToggleInputComponent } from "../../../../components/inputs/toggle-input/toggle-input.component";
import { PhoneNumberMaskPipe } from "../../../../lib/utils/phone-mask/phone-number-mask-pipe";
import { CpfMaskPipe } from "../../../../lib/utils/cpf-mask/cpf-mask-pipe";
import { UserRoles } from "../../../../lib/enums/UserRoles";

@Component({
    selector: "app-user-table",
    standalone: true,
    imports: [
        CommonModule,
        SearchFilterComponent,
        PageRangeComponent,
        TableComponent,
        ButtonComponent,
        ContainerDivComponent,
        ToggleInputComponent
    ],
    templateUrl: "./user-table.component.html"
})
export class UserTableComponent {

    private readonly userQuery = inject(UserQueryService);

    @Output() manageAddresses = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();

    @ViewChild('toggleTemplate', { static: true }) toggleTemplate!: TemplateRef<any>;

    columnsTable: TableColumn<UserResponse>[] = [];

    ngOnInit() {
        this.columnsTable = [
            { label: "Nome", key: "name" },
            { label: "E-mail", key: "email" },
            { label: "Cargo", key: "role", width: '150px', formatter: (row, value) => {
                return value === UserRoles.ADMIN ? 'Administrador' : value === UserRoles.CUSTOMER ? 'Cliente' : value;
            }},
            {
                key: 'isActive',
                label: 'Status',
                align: 'center',
                template: this.toggleTemplate,
                width: '120px',
            },
            {
                label: "Telefone", key: "phoneNumber", formatter: (row, value) => {
                    const pipe = new PhoneNumberMaskPipe();
                    return pipe.transform(value);
                }
            },
            {
                label: "CPF", key: "cpf", formatter: (row, value) => {
                    const pipe = new CpfMaskPipe();
                    return pipe.transform(value);
                }
            },
        ];
    }


    onSearch(text: string) {
        this.userQuery.setParams({ search: text, page: 1 });
    }

    onPageChange(page: number) {
        this.userQuery.setParams({ page });
    }

    onToggleStatus(row: any, newStatus: boolean) {
        this.userQuery.updateUserStatus.mutate({ id: row.id, isActive: newStatus });
    }

    listUsers = this.userQuery.getListUsers;

    get dataUsers() {
        return this.listUsers.data()?.items ?? [];
    }

    get isLoading() {
        return this.listUsers.isLoading();
    }

    get isError() {
        return this.listUsers.isError();
    }

    get totalItems() {
        return this.listUsers.data()?.total ?? 0;
    }

    get limit() {
        const data = this.listUsers.data();
        if (!data) return 10;
        return data.limit;
    }

    get currentPage() {
        const data = this.listUsers.data();
        if (!data) return 1;
        return (data.page ?? 0) + 1;
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.limit);
    }
}
