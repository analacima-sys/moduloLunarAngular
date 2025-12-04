// src/app/components/mineral/mineral.component.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MineralFormExtendidoService } from '../../services/mineral-form-extendido.service';
import { MineralFormReducidoService } from '../../services/mineral-form-reducido.service';
import { CriterioService, CriterioValidacion } from '../../services/criterio.service';
import { Mineral, TipoRoca, TamanoGrano, Clasificacion, Textura, TRADUCCIONES_EN } from '../../../types';

export enum ModoFormulario {
  Extendido = 'extendido',
  Reducido = 'reducido'
}

@Component({
  standalone: true,
  selector: 'app-mineral',
  templateUrl: './mineral.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class MineralComponent {
  readonly ModoFormulario = ModoFormulario;
  readonly Object = Object;
  
  modoActual = signal<ModoFormulario>(ModoFormulario.Extendido);
  criterioSeleccionado = signal<CriterioValidacion>(CriterioValidacion.Igneas);
  esValido = signal<boolean | null>(null);
  ultimoMineral = signal<Mineral | null>(null);
  formatoSalida = signal<'europeo' | 'americano'>('europeo');

  readonly criterios = CriterioValidacion;
  readonly tiposRoca = Object.values(TipoRoca);
  readonly tamaniosGrano = Object.values(TamanoGrano);
  readonly texturas = Object.values(Textura);
  readonly clasificaciones = Object.values(Clasificacion);

  // Computed para obtener el formulario activo
  formularioActivo = computed(() => {
    return this.modoActual() === ModoFormulario.Extendido
      ? this.formExtendido.formulario
      : this.formReducido.formulario;
  });

  constructor(
    private formExtendido: MineralFormExtendidoService,
    private formReducido: MineralFormReducidoService,
    private criterioSvc: CriterioService
  ) {}

  cambiarModo(modo: ModoFormulario): void {
    // Guardar valores del formulario actual
    const valoresActuales = this.formularioActivo().value;
    
    // Cambiar el modo
    this.modoActual.set(modo);
    
    // Transferir valores al nuevo formulario
    this.formularioActivo().patchValue(valoresActuales);
  }

  cambiarCriterio(criterio: CriterioValidacion): void {
    this.criterioSeleccionado.set(criterio);
  }

  cambiarFormato(formato: 'europeo' | 'americano'): void {
    this.formatoSalida.set(formato);
  }

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
      textura: formValue.textura!
    };

    const valido = this.criterioSvc.validar(mineral, this.criterioSeleccionado());
    this.esValido.set(valido);
    this.ultimoMineral.set(mineral);
  }

  limpiar(): void {
    if (this.modoActual() === ModoFormulario.Extendido) {
      this.formExtendido.reset();
    } else {
      this.formReducido.reset();
    }
    this.esValido.set(null);
    this.ultimoMineral.set(null);
  }

  traducir(texto: string): string {
    if (this.formatoSalida() === 'americano') {
      return TRADUCCIONES_EN[texto] || texto;
    }
    return texto;
  }

  temperaturaFormateada(kelvin: number): string {
    if (this.formatoSalida() === 'europeo') {
      const celsius = this.criterioSvc.kelvinToCelsius(kelvin);
      return `${celsius.toFixed(2)} °C`;
    } else {
      const fahrenheit = this.criterioSvc.kelvinToFahrenheit(kelvin);
      return `${fahrenheit.toFixed(2)} °F`;
    }
  }

  // Getters para labels traducidas
  get labelId(): string {
    return this.formatoSalida() === 'americano' ? 'ID (LLDDDDLL)' : 'ID (LLDDDDLL)';
  }

  get labelNombre(): string {
    return this.formatoSalida() === 'americano' ? 'Name' : 'Nombre';
  }

  get labelGrupo(): string {
    return this.formatoSalida() === 'americano' ? 'Group / Origin' : 'Grupo / Origen';
  }

  get labelDureza(): string {
    return this.formatoSalida() === 'americano' ? 'Hardness (1-10)' : 'Dureza (1-10)';
  }

  get labelTamanoCristales(): string {
    return this.formatoSalida() === 'americano' ? 'Crystal size (0-10)' : 'Tamaño de cristales (0-10)';
  }

  get labelTamanoGrano(): string {
    return this.formatoSalida() === 'americano' ? 'Grain size' : 'Tamaño de grano';
  }

  get labelClasificacion(): string {
    return this.formatoSalida() === 'americano' ? 'Classification' : 'Clasificación';
  }

  get labelTemperatura(): string {
    return this.formatoSalida() === 'americano' 
      ? 'Formation temperature (K)' 
      : 'Temperatura de formación (K)';
  }

  get labelEstructura(): string {
    return this.formatoSalida() === 'americano' ? 'Structure' : 'Estructura';
  }

  get labelFormaGranos(): string {
    return this.formatoSalida() === 'americano' ? 'Grain shape' : 'Forma de los granos';
  }

  get labelTextura(): string {
    return this.formatoSalida() === 'americano' ? 'Texture' : 'Textura';
  }

  get textoAnalizar(): string {
    return this.formatoSalida() === 'americano' ? 'Analyze Mineral' : 'Analizar Mineral';
  }

  get textoLimpiar(): string {
    return this.formatoSalida() === 'americano' ? 'Clear' : 'Limpiar';
  }

  get textoValido(): string {
    return this.formatoSalida() === 'americano' ? '✓ Valid mineral' : '✓ Mineral válido';
  }

  get textoNoValido(): string {
    return this.formatoSalida() === 'americano' ? '✗ Invalid mineral' : '✗ Mineral no válido';
  }

  get textoCumple(): string {
    return this.formatoSalida() === 'americano' ? ' meets ' : ' cumple ';
  }

  get textoNoCumple(): string {
    return this.formatoSalida() === 'americano' ? ' does not meet ' : ' no cumple ';
  }

  get textoCriterio(): string {
    return this.formatoSalida() === 'americano' ? 'the criterion' : 'el criterio';
  }

  get textoDatosMineral(): string {
    return this.formatoSalida() === 'americano' ? 'Mineral data' : 'Datos del mineral';
  }
}