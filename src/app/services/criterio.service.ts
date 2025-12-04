// src/app/services/criterio.service.ts
import { Injectable } from '@angular/core';
import { Mineral, TipoRoca, TamanoGrano, Textura } from '../../types';

export enum CriterioValidacion {
  Igneas = 'Criterio ígneas',
  Metamorficas = 'Criterio metamórficas',
  Sedimentarias = 'Criterio sedimentarias'
}

@Injectable({ providedIn: 'root' })
export class CriterioService {
  
  /**
   * Valida un mineral según el criterio seleccionado
   */
  validar(mineral: Mineral, criterio: CriterioValidacion): boolean {
    switch (criterio) {
      case CriterioValidacion.Igneas:
        // Criterio Ígneas: Grupo ígneas + Grano muy grueso
        return mineral.grupo === TipoRoca.Ignea &&
               mineral.tamanoGrano === TamanoGrano.MuyGrueso;

      case CriterioValidacion.Metamorficas:
        // Criterio Metamórficas: Grupo metamórfica + Grano medio o fino + Textura vítrea
        return mineral.grupo === TipoRoca.Metamorfica &&
               (mineral.tamanoGrano === TamanoGrano.Medio ||
                mineral.tamanoGrano === TamanoGrano.Fino) &&
               mineral.textura === Textura.Vitrea;

      case CriterioValidacion.Sedimentarias:
        // Criterio Sedimentarias: Grupo sedimentaria + Textura fanerítica
        return mineral.grupo === TipoRoca.Sedimentaria &&
               mineral.textura === Textura.Faneritica;

      default:
        return false;
    }
  }

  /**
   * Convierte Kelvin a Celsius
   * °C = K - 273.15
   */
  kelvinToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  /**
   * Convierte Kelvin a Fahrenheit
   * °F = (K - 273.15) × 9/5 + 32
   */
  kelvinToFahrenheit(kelvin: number): number {
    const celsius = this.kelvinToCelsius(kelvin);
    return (celsius * 9 / 5) + 32;
  }
}