// src/app/components/inventario/inventario.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  // Por ahora, array vacío para mostrar la tabla sin datos
  minerales: any[] = [];
  
  // Estadísticas mock
  totalMinerales = 0;
  mineralesIgneas = 0;
  mineralesMetamorficas = 0;
  mineralesSedimentarias = 0;
}
