import { Component, signal, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserTableComponent } from "./user-table/user-table.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { AlertDialogComponent } from "../../../components/dialogs/alert-dialog/alert-dialog.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { UserQueryService } from "../../../services/api/user/user-query/user-query.service";
import { UserResponse } from "../../../lib/interfaces/IUser";
import { AddressManagerComponent } from "./address-manager/address-manager.component";

@Component({
    selector: "app-user-page",
    standalone: true,
    imports: [
        CommonModule,
        UserTableComponent,
        UserFormComponent,
        AlertDialogComponent,
        ButtonComponent,
        AddressManagerComponent
    ],
    templateUrl: "./user-page.component.html",
    styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {

    private readonly userQuery = inject(UserQueryService);

    createOrEditDialogOpen = signal(false);
    deleteDialogOpen = signal(false);
    addressDialogOpen = signal(false);

    selectedUser = signal<UserResponse | null>(null);

    openAddressManager(user: UserResponse) {
        this.selectedUser.set(user);
        this.addressDialogOpen.set(true);
    }

    onCreate() {
        this.selectedUser.set(null);
        this.createOrEditDialogOpen.set(true);
    }

    onEdit(user: UserResponse) {
        this.selectedUser.set(user);
        this.createOrEditDialogOpen.set(true);
    }

    onDelete(user: UserResponse) {
        this.selectedUser.set(user);
        this.deleteDialogOpen.set(true);
    }

    confirmDelete() {
        const user = this.selectedUser();
        if (!user) return;

        this.userQuery.deleteUser.mutate(user.id);
        this.deleteDialogOpen.set(false);
    }

    handleSubmit(payload: { id?: string; data: any; addresses: any[] }) {
        if (payload.id) {
            this.userQuery.updateUser.mutate({ id: payload.id, data: payload.data });
        } else {
            this.userQuery.createUser.mutate(payload.data);
        }

        this.createOrEditDialogOpen.set(false);
    }
}
