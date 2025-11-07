import { Routes } from '@angular/router';
import { ProductsPageComponent } from './pages/public/products-page/products-page.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout.component';
import { GpuPageComponent } from './pages/admin/gpu-page/gpu-page.component';

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
    ],
  },
];
