// src/app/components/panel-configuracion/panel-configuracion.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';
import { ModoFormulario, CriterioValidacion, FormatoSalida } from '../../shared/enums';

@Component({
  selector: 'app-panel-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-configuracion.component.html',
  styleUrls: ['./panel-configuracion.component.css'],
})
export class PanelConfiguracionComponent {
  // Usamos el servicio compartido
  constructor(public configSvc: ConfiguracionService) {}

  // Enums para usar en la plantilla
  readonly ModoFormulario = ModoFormulario;
  readonly CriterioValidacion = CriterioValidacion;
  readonly Object = Object; // Exponer Object para la plantilla

  // Métodos para cambiar la configuración
  cambiarModo(modo: ModoFormulario): void {
    this.configSvc.cambiarModo(modo);
  }

  cambiarCriterio(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.configSvc.cambiarCriterio(select.value as CriterioValidacion);
  }

  cambiarFormato(formato: FormatoSalida): void {
    this.configSvc.cambiarFormato(formato);
  }
}
