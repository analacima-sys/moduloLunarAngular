// src/app/components/mineral/mineral.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriterioService } from '../../services/criterio.service';
import { ConfiguracionService } from '../../services/configuracion.service';
import { Mineral } from '../../../types';
import { MineralFormComponent } from './mineral-form/mineral-form.component';
import { MineralResultadoComponent } from './mineral-resultado/mineral-resultado.component';
import { MineralDatosComponent } from './mineral-datos/mineral-datos.component';

@Component({
  standalone: true,
  selector: 'app-mineral',
  imports: [
    CommonModule,
    MineralFormComponent,
    MineralResultadoComponent,
    MineralDatosComponent
  ],
  template: `
    <app-mineral-form (mineralAnalizado)="analizar($event)"></app-mineral-form>
    
    <app-mineral-resultado 
      [esValido]="esValido()"
      [mineral]="ultimoMineral()"
      [criterio]="configSvc.criterio()">
    </app-mineral-resultado>
    
    @if (ultimoMineral() && esValido()) {
      <app-mineral-datos [mineral]="ultimoMineral()!"></app-mineral-datos>
    }
  `
})
export class MineralComponent {
  esValido = signal<boolean | null>(null);
  ultimoMineral = signal<Mineral | null>(null);

  constructor(
    public configSvc: ConfiguracionService,
    private criterioSvc: CriterioService
  ) {}

  analizar(mineral: Mineral): void {
    const valido = this.criterioSvc.validar(mineral, this.configSvc.criterio());
    this.esValido.set(valido);
    this.ultimoMineral.set(mineral);
  }
}