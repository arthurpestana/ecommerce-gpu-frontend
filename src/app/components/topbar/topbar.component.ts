import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';
import { AuthQueryService } from '../../services/api/auth/auth-query/auth-query.service';

import { LucideAngularModule, ShoppingCart, User, LogIn } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { CartService } from '../../services/cart-service/cart-service.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    LucideIconComponent,
    SearchFilterComponent,
    ButtonComponent,
    UserAvatarComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent {

  private readonly auth = inject(AuthQueryService);
  private readonly cart = inject(CartService); 
  public router = inject(Router);

  user = computed(() => this.auth.user());
  cartCount = computed(() => this.cart.totalItems());

  onSearch(value: string) {
    this.router.navigate(['/'], {
      queryParams: { search: value }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToProfile() {
    this.router.navigate(['/account']);
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
