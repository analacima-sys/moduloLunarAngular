// src/app/components/panel-configuracion/panel-configuracion-navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';
import { ModoFormulario, CriterioValidacion, FormatoSalida } from '../../shared/enums';

@Component({
  selector: 'app-panel-configuracion-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-configuracion-navbar.component.html',
  styleUrls: ['./panel-configuracion-navbar.css']
})
export class PanelConfiguracionNavbarComponent {
  constructor(public configSvc: ConfiguracionService) {}

  readonly ModoFormulario = ModoFormulario;
  readonly CriterioValidacion = CriterioValidacion;
  
  // Getter para los criterios (REEMPLAZA la exposición de Object)
  get criterios() {
    return Object.values(CriterioValidacion);
  }

  // Métodos abreviados para el modo compacto
  getModoTexto(): string {
    return this.configSvc.modo() === ModoFormulario.Extendido ? 'Extendido' : 'Reducido';
  }

  getFormatoTexto(): string {
    return this.configSvc.formato() === 'europeo' ? 'Europeo' : 'Americano';
  }

  cambiarModo(): void {
    const nuevoModo = this.configSvc.modo() === ModoFormulario.Extendido 
      ? ModoFormulario.Reducido 
      : ModoFormulario.Extendido;
    this.configSvc.cambiarModo(nuevoModo);
  }

  cambiarCriterio(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.configSvc.cambiarCriterio(select.value as CriterioValidacion);
  }

  cambiarFormato(): void {
    const nuevoFormato = this.configSvc.formato() === 'europeo' 
      ? 'americano' 
      : 'europeo';
    this.configSvc.cambiarFormato(nuevoFormato as FormatoSalida);
  }
}