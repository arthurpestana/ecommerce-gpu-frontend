import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('ecommerce-gpu-frontend');

  logar(event: string) {
    console.log('Evento recebido no AppComponent:', event);
  }
}
