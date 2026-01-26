// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PanelConfiguracionNavbarComponent } from "./components/panel-configuracion/panel-configuracion-navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, PanelConfiguracionNavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <!-- Panel para tablet (compacto horizontal) -->
      <div class="tablet-panel-wrapper">
        <app-panel-configuracion-navbar></app-panel-configuracion-navbar>
      </div>
      
      <!-- Panel para móvil (vertical expandido) -->
      <div class="mobile-panel-wrapper">
        <app-panel-configuracion-navbar [mobileMode]="true"></app-panel-configuracion-navbar>
      </div>
      
      <!-- Router Outlet para mostrar los componentes según la ruta -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    /* Panel para TABLET: compacto horizontal, fuera del navbar */
    .tablet-panel-wrapper {
      display: none;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: rgba(42, 46, 56, 0.95);
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      .tablet-panel-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    /* Panel para MÓVIL: vertical expandido */
    .mobile-panel-wrapper {
      display: none;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: rgba(42, 46, 56, 0.95);
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 767.98px) {
      .mobile-panel-wrapper {
        display: block;
      }
    }
  `]
})
export class App {
  title = 'Módulo Lunar Angular';
}
