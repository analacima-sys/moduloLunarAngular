// src/app/components/mineral/mineral-datos/mineral-datos.component.ts
import { Component, input, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mineral } from '../../../../types';
import { TraducirEnumPipe } from '../../../pipes/traducir-enum.pipe';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { CriterioService } from '../../../services/criterio.service';

@Component({
  selector: 'app-mineral-datos',
  standalone: true,
  imports: [CommonModule, TraducirEnumPipe],
  templateUrl: './mineral-datos.component.html'
})
export class MineralDatosComponent {
  // Signal input
  mineral = input.required<Mineral>();
  
  // Inyecciones
  locale = inject(LOCALE_ID);
  
  constructor(
    private configSvc: ConfiguracionService,
    private criterioSvc: CriterioService
  ) {}

  temperaturaFormateada(kelvin: number): string {
    if (this.configSvc.formato() === 'europeo') {
      const celsius = this.criterioSvc.kelvinToCelsius(kelvin);
      return `${celsius.toFixed(2)} °C`;
    } else {
      const fahrenheit = this.criterioSvc.kelvinToFahrenheit(kelvin);
      return `${fahrenheit.toFixed(2)} °F`;
    }
  }
}
