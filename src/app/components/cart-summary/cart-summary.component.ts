import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-cart-summary',
    standalone: true,
    imports: [CommonModule, ButtonComponent],
    templateUrl: './cart-summary.component.html',
    styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {

    @Input() total: number = 0;
    @Input() quantity: number = 0;
    @Input() disabled: boolean = false;

    @Output() continue = new EventEmitter<void>();
    @Output() return = new EventEmitter<void>();
}
