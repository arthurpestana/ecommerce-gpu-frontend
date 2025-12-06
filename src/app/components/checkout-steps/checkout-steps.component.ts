import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, MapPin, Truck, CreditCard, Eye, CheckCircle } from 'lucide-angular';

@Component({
  selector: 'app-checkout-steps',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './checkout-steps.component.html',
  styleUrls: ['./checkout-steps.component.css'],
})
export class CheckoutStepsComponent {
  @Input() currentStep: string = 'cart';

  steps = [
    { index: '1', key: 'cart', label: 'Carrinho', icon: ShoppingCart },
    { index: '2', key: 'address', label: 'Endereço', icon: MapPin },
    { index: '3', key: 'payment', label: 'Pagamento', icon: CreditCard },
    { index: '4', key: 'complete', label: 'Concluir', icon: CheckCircle }
  ];

  isStepCompleted(stepKey: string): boolean {
    const stepOrder = this.steps.map(step => step.key);
    return stepOrder.indexOf(stepKey) < stepOrder.indexOf(this.currentStep);
  }
}
