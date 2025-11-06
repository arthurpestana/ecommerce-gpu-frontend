import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Home, Users, Settings, LogOut, Menu, ChevronLeft, ChevronRight, Package, PackageSearch, Factory, ChartBarStacked, Cpu, Component as ComponentIcon, Gpu } from 'lucide-angular';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  icons = { Home, Users, Settings, LogOut, ChevronLeft, ChevronRight, Menu, PackageSearch, Factory, ChartBarStacked, Cpu, ComponentIcon, Gpu };

  isCollapsed = signal(false);

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
    console.log('Sidebar collapsed:', this.isCollapsed());
  }

  navbarItems = [
    { label: 'Dashboard', icon: this.icons.Home, route: '/admin' },
    { label: 'Gpus', icon: this.icons.Gpu, route: '/admin/gpus' },
    { label: 'Modelos', icon: this.icons.ComponentIcon, route: '/admin/models' },
    { label: 'Fabricantes', icon: this.icons.Factory, route: '/admin/manufacturers' },
    { label: 'Categorias', icon: this.icons.ChartBarStacked, route: '/admin/categories' },
    { label: 'Tecnologias', icon: this.icons.Cpu, route: '/admin/technologies' },
    { label: 'Inventário', icon: this.icons.PackageSearch, route: '/admin/inventory' },
    { label: 'Usuários', icon: this.icons.Users, route: '/admin/users' },
    { label: 'Configurações', icon: this.icons.Settings, route: '/admin/settings' },
  ];

}
