import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../components/topbar/topbar.component';

@Component({
    selector: 'app-public-layout',
    standalone: true,
    imports: [RouterOutlet, TopbarComponent],
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent { }
