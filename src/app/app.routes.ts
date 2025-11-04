import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductsPageComponent
    }
];
