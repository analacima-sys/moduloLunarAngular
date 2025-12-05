// src/app/components/mineral/mineral.component.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MineralFormExtendidoService } from '../../services/mineral-form-extendido.service';
import { MineralFormReducidoService } from '../../services/mineral-form-reducido.service';
import { CriterioService } from '../../services/criterio.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { PanelConfiguracionComponent } from '../panel-configuracion/panel-configuracion.component';
import { ModoFormulario } from '../../shared/enums';
import {
  Mineral,
  TipoRoca,
  TamanoGrano,
  Clasificacion,
  Textura,
  TRADUCCIONES_EN,
} from '../../../types';

@Component({
  standalone: true,
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelConfiguracionComponent],
})
export class MineralComponent {
  // Exponer ModoFormulario para la plantilla
  readonly ModoFormulario = ModoFormulario;

  esValido = signal<boolean | null>(null);
  ultimoMineral = signal<Mineral | null>(null);

  readonly Object = Object; // Exponer Object para la plantilla si lo necesitas

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
    private criterioSvc: CriterioService
  ) {}

  // Resto de los métodos se mantienen igual...
  analizar(): void {
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
      textura: formValue.textura!,
    };

    const valido = this.criterioSvc.validar(mineral, this.configSvc.criterio());
    this.esValido.set(valido);
    this.ultimoMineral.set(mineral);
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

  traducir(texto: string): string {
    if (this.configSvc.formato() === 'americano') {
      return TRADUCCIONES_EN[texto] || texto;
    }
    return texto;
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

  // Getters para labels traducidas
  get labelId(): string {
    return this.configSvc.formato() === 'americano' ? 'ID (LLDDDDLL)' : 'ID (LLDDDDLL)';
  }

  get labelNombre(): string {
    return this.configSvc.formato() === 'americano' ? 'Name' : 'Nombre';
  }

  get labelGrupo(): string {
    return this.configSvc.formato() === 'americano' ? 'Group / Origin' : 'Grupo / Origen';
  }

  get labelDureza(): string {
    return this.configSvc.formato() === 'americano' ? 'Hardness (1-10)' : 'Dureza (1-10)';
  }

  get labelTamanoCristales(): string {
    return this.configSvc.formato() === 'americano'
      ? 'Crystal size (0-10)'
      : 'Tamaño de cristales (0-10)';
  }

  get labelTamanoGrano(): string {
    return this.configSvc.formato() === 'americano' ? 'Grain size' : 'Tamaño de grano';
  }

  get labelClasificacion(): string {
    return this.configSvc.formato() === 'americano' ? 'Classification' : 'Clasificación';
  }

  get labelTemperatura(): string {
    return this.configSvc.formato() === 'americano'
      ? 'Formation temperature (K)'
      : 'Temperatura de formación (K)';
  }

  get labelEstructura(): string {
    return this.configSvc.formato() === 'americano' ? 'Structure' : 'Estructura';
  }

  get labelFormaGranos(): string {
    return this.configSvc.formato() === 'americano' ? 'Grain shape' : 'Forma de los granos';
  }

  get labelTextura(): string {
    return this.configSvc.formato() === 'americano' ? 'Texture' : 'Textura';
  }

  get textoAnalizar(): string {
    return this.configSvc.formato() === 'americano' ? 'Analyze Mineral' : 'Analizar Mineral';
  }

  get textoLimpiar(): string {
    return this.configSvc.formato() === 'americano' ? 'Clear' : 'Limpiar';
  }

  get textoValido(): string {
    return this.configSvc.formato() === 'americano' ? '✓ Valid mineral' : '✓ Mineral válido';
  }

  get textoNoValido(): string {
    return this.configSvc.formato() === 'americano' ? '✗ Invalid mineral' : '✗ Mineral no válido';
  }

  get textoCumple(): string {
    return this.configSvc.formato() === 'americano' ? ' meets ' : ' cumple ';
  }

  get textoNoCumple(): string {
    return this.configSvc.formato() === 'americano' ? ' does not meet ' : ' no cumple ';
  }

  get textoCriterio(): string {
    return this.configSvc.formato() === 'americano' ? 'the criterion' : 'el criterio';
  }

  get textoDatosMineral(): string {
    return this.configSvc.formato() === 'americano' ? 'Mineral data' : 'Datos del mineral';
  }
}
