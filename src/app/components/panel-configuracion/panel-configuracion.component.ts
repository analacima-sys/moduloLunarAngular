// src/app/components/panel-configuracion/panel-configuracion.component.ts
import { Component, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from '../../services/configuracion.service';
import { ModoFormulario, CriterioValidacion, FormatoSalida } from '../../shared/enums';
import { TraducirEnumPipe } from '../../pipes/traducir-enum.pipe';

@Component({
  selector: 'app-panel-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule, TraducirEnumPipe],
  templateUrl: './panel-configuracion.component.html',
  styleUrls: ['./panel-configuracion.component.css']
})
export class PanelConfiguracionComponent {
  locale = inject(LOCALE_ID);
  
  constructor(public configSvc: ConfiguracionService) {}

  readonly ModoFormulario = ModoFormulario;
  readonly CriterioValidacion = CriterioValidacion;
  
  // Getter para los criterios
  get criteriosArray() {
    return Object.values(CriterioValidacion);
  }

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