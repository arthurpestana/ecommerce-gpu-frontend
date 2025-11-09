import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/public/products-page/products-page.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout.component';
import { GpuPageComponent } from './pages/admin/gpu-page/gpu-page.component';
import { CategoryPageComponent } from './pages/admin/category-page/category-page.component';
import { ModelPageComponent } from './pages/admin/model-page/model-page.component';
import { ManufacturerPageComponent } from './pages/admin/manufacturer-page/manufacturer-page.component';
import { InventoryPageComponent } from './pages/admin/inventory-page/inventory-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    title: 'Produtos - GPU E-commerce',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
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
      }
    ],
  },
];
