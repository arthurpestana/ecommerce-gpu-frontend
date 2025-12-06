import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/public/products-page/products-page.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout.component';
import { GpuPageComponent } from './pages/admin/gpu-page/gpu-page.component';
import { CategoryPageComponent } from './pages/admin/category-page/category-page.component';
import { ModelPageComponent } from './pages/admin/model-page/model-page.component';
import { ManufacturerPageComponent } from './pages/admin/manufacturer-page/manufacturer-page.component';
import { InventoryPageComponent } from './pages/admin/inventory-page/inventory-page.component';
import { UserPageComponent } from './pages/admin/user-page/user-page.component';
import { AuthLayoutComponent } from './pages/auth/auth-layout.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { authAdminGuard } from './guards/auth-admin/auth-admin-guard';
import { PublicLayoutComponent } from './pages/public/public-layout.component';
import { CheckoutPageComponent } from './pages/public/checkout-page/checkout-page.component';
import { AccountPageComponent } from './pages/public/account-page/account-page.component';
import { authAuthenticatedGuard } from './guards/auth-authenticated/auth-authenticated-guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    title: 'GPU E-commerce',
    children: [
        {
            path: '',
            component: ProductsPageComponent,
            title: 'Produtos - GPU E-commerce',
        },
        {
            path: 'checkout',
            component: CheckoutPageComponent,
            title: 'Checkout - GPU E-commerce',
        },
        {
            path: 'account',
            component: AccountPageComponent,
            title: 'Minha Conta - GPU E-commerce',
            canActivate: [authAuthenticatedGuard],
        }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full',
        },
        {
            path: 'login',
            component: LoginPageComponent,
            title: 'Login - GPU E-commerce',
        },
        {
            path: 'register',
            component: RegisterPageComponent,
            title: 'Cadastro - GPU E-commerce',
        }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authAdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'gpus',
        pathMatch: 'full',
      },
      {
        path: 'gpus',
        component: GpuPageComponent,
        title: 'Admin - GPUs',
      },
      {
        path: 'categories',
        component: CategoryPageComponent,
        title: 'Admin - Categorias',
      },
      {
        path: 'models',
        component: ModelPageComponent,
        title: 'Admin - Modelos',
      },
      {
        path: 'manufacturers',
        component: ManufacturerPageComponent,
        title: 'Admin - Fabricantes',
      },
      {
        path: 'inventory',
        component: InventoryPageComponent,
        title: 'Admin - Inventário',
      },
      {
        path: 'users',
        component: UserPageComponent,
        title: 'Admin - Usuários',
      },
    ],
  },
];
