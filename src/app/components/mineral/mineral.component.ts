// src/app/components/mineral/mineral.component.ts
import { Component, signal, computed, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MineralFormExtendidoService } from '../../services/mineral-form-extendido.service';
import { MineralFormReducidoService } from '../../services/mineral-form-reducido.service';
import { CriterioService } from '../../services/criterio.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { IndexedDBService } from '../../services/indexeddb.service';
import { ModoFormulario } from '../../shared/enums';
import { Mineral, TipoRoca, TamanoGrano, Clasificacion, Textura } from '../../../types';
import { TraducirEnumPipe } from '../../pipes/traducir-enum.pipe';

@Component({
  standalone: true,
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    TraducirEnumPipe
  ]
})
export class MineralComponent {
  // Exponer ModoFormulario para la plantilla
  readonly ModoFormulario = ModoFormulario;
  
  // Inyectar el locale actual
  locale = inject(LOCALE_ID);
  
  esValido = signal<boolean | null>(null);
  ultimoMineral = signal<Mineral | null>(null);

  readonly tiposRoca = Object.values(TipoRoca);
  readonly tamaniosGrano = Object.values(TamanoGrano);
  readonly texturas = Object.values(Textura);
  readonly clasificaciones = Object.values(Clasificacion);

  // Computed para obtener el formulario activo
  formularioActivo = computed(() => {
    return this.configSvc.modo() === ModoFormulario.Extendido
      ? this.formExtendido.formulario
      : this.formReducido.formulario;
  });

  constructor(
    public configSvc: ConfiguracionService,
    private formExtendido: MineralFormExtendidoService,
    private formReducido: MineralFormReducidoService,
    private criterioSvc: CriterioService,
    private indexedDBSvc: IndexedDBService
  ) {}

  async analizar(): Promise<void> {
    const form = this.formularioActivo();
    
    if (form.invalid) {
      form.markAllAsTouched();
      this.esValido.set(false);
      this.ultimoMineral.set(null);
      return;
    }

    const formValue = form.value;
    
    const mineral: Mineral = {
      id: formValue.id!,
      nombre: formValue.nombre!,
      grupo: formValue.grupo!,
      dureza: Number(formValue.dureza),
      tamanoGrano: formValue.tamanoGrano!,
      clasificacion: formValue.clasificacion!,
      tamanoCristales: Number(formValue.tamanoCristales),
      temperaturaFormacion: Number(formValue.temperaturaFormacion),
      estructura: formValue.estructura || '',
      formaGranos: formValue.formaGranos || '',
      textura: formValue.textura!
    };

    const valido = this.criterioSvc.validar(mineral, this.configSvc.criterio());
    this.esValido.set(valido);
    this.ultimoMineral.set(mineral);

    // Si es válido, guardar en IndexedDB
    if (valido) {
      try {
        const idRegistro = await this.indexedDBSvc.guardarMineral(
          mineral,
          this.configSvc.criterio(),
          valido,
          this.locale,
          this.configSvc.formato()
        );
        console.log('✅ Mineral válido guardado en IndexedDB con ID:', idRegistro);
      } catch (error) {
        console.error('❌ Error al guardar mineral en IndexedDB:', error);
      }
    }
  }

  limpiar(): void {
    if (this.configSvc.modo() === ModoFormulario.Extendido) {
      this.formExtendido.reset();
    } else {
      this.formReducido.reset();
    }
    this.esValido.set(null);
    this.ultimoMineral.set(null);
  }

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