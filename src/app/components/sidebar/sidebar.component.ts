import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Users, Settings, LogOut, Menu, ChevronLeft, ChevronRight, Package, PackageSearch, Factory, ChartBarStacked, Cpu, Component as ComponentIcon, Gpu, House } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';
import { LucideIconComponent } from '../lucide-icon/lucide-icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, ButtonComponent, LucideIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  icons = { House, Users, Settings, LogOut, ChevronLeft, ChevronRight, Menu, PackageSearch, Factory, ChartBarStacked, Cpu, ComponentIcon, Gpu };

  isCollapsed = signal(false);

  isSelected(route: string): boolean {
    return window.location.pathname === route;
  }

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
  }

  sidebarItems = [
    // { label: 'Dashboard', icon: this.icons.House, route: '/admin' },
    { label: 'Gpus', icon: this.icons.Gpu, route: '/admin/gpus' },
    { label: 'Modelos', icon: this.icons.ComponentIcon, route: '/admin/models' },
    { label: 'Fabricantes', icon: this.icons.Factory, route: '/admin/manufacturers' },
    { label: 'Categorias', icon: this.icons.ChartBarStacked, route: '/admin/categories' },
    // { label: 'Tecnologias', icon: this.icons.Cpu, route: '/admin/technologies' },
    { label: 'Inventário', icon: this.icons.PackageSearch, route: '/admin/inventory' },
    // { label: 'Usuários', icon: this.icons.Users, route: '/admin/users' },
    // { label: 'Configurações', icon: this.icons.Settings, route: '/admin/settings' },
  ];

}
