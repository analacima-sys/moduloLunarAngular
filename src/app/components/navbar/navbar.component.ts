// src/app/components/navbar/navbar.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule]
})
export class NavbarComponent {
  // Datos del astronauta (más adelante podrían venir de un servicio)
  astronauta = signal({
    nombre: 'Neil Armstrong',
    rango: 'Comandante',
    mision: 'Apollo 11'
  });

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

  cerrarSesion(): void {
    // TODO: Implementar cierre de sesión
    console.log('Cerrar sesión');
  }
}