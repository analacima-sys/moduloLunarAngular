// src/app/components/navbar/navbar.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AstronautaComponent } from '../astronauta/astronauta';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink, AstronautaComponent]
})
export class NavbarComponent {
  // Control del menú móvil
  menuAbierto = signal(false);


  toggleMenu(): void {
    this.menuAbierto.update(v => !v);
  }

  verInventario(): void {
    // TODO: Implementar navegación al inventario
    console.log('Ver inventario');
  }

  verMisiones(): void {
    // TODO: Implementar navegación a misiones
    console.log('Ver misiones');
  }
}