// src/app/services/configuracion.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { ModoFormulario, CriterioValidacion, FormatoSalida } from '../shared/enums';

export interface Configuracion {
  modo: ModoFormulario;
  criterio: CriterioValidacion;
  formato: FormatoSalida;
}

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
  // Estado reactivo con signals
  private _configuracion = signal<Configuracion>({
    modo: ModoFormulario.Extendido,
    criterio: CriterioValidacion.Igneas,
    formato: 'europeo'
  });

  // Getters reactivos
  modo = computed(() => this._configuracion().modo);
  criterio = computed(() => this._configuracion().criterio);
  formato = computed(() => this._configuracion().formato);
  configuracion = computed(() => this._configuracion());

  // Setters
  cambiarModo(modo: ModoFormulario): void {
    this._configuracion.update(config => ({ ...config, modo }));
  }

  cambiarCriterio(criterio: CriterioValidacion): void {
    this._configuracion.update(config => ({ ...config, criterio }));
  }

  cambiarFormato(formato: FormatoSalida): void {
    this._configuracion.update(config => ({ ...config, formato }));
  }

  resetear(): void {
    this._configuracion.set({
      modo: ModoFormulario.Extendido,
      criterio: CriterioValidacion.Igneas,
      formato: 'europeo'
    });
  }
}