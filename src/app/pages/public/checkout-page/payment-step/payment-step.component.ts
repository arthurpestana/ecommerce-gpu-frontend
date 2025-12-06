import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../components/button/button.component';
import { PaymentMethod } from '../../../../lib/enums/PaymentMethod';

@Component({
  selector: 'app-payment-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.css'],
})
export class PaymentStepComponent {

  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<PaymentMethod>();

  PaymentMethod = PaymentMethod;

  selected: PaymentMethod | null = null;

  select(method: PaymentMethod) {
    this.selected = method;
  }

  continue() {
    if (this.selected) this.next.emit(this.selected);
  }
}
