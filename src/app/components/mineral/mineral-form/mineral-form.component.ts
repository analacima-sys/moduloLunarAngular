// src/app/components/mineral/mineral-form/mineral-form.component.ts
import { Component, input, output, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MineralFormExtendidoService } from '../../../services/mineral-form-extendido.service';
import { MineralFormReducidoService } from '../../../services/mineral-form-reducido.service';
import { ConfiguracionService } from '../../../services/configuracion.service';
import { ModoFormulario } from '../../../shared/enums';
import { Mineral, TipoRoca, TamanoGrano, Clasificacion, Textura } from '../../../../types';
import { TraducirEnumPipe } from '../../../pipes/traducir-enum.pipe';

@Component({
  selector: 'app-mineral-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TraducirEnumPipe
  ],
  templateUrl: './mineral-form.component.html'
})
export class MineralFormComponent {
  // Signal inputs/outputs
  mineralAnalizado = output<Mineral>();
  
  // Inyecciones
  locale = inject(LOCALE_ID);
  readonly ModoFormulario = ModoFormulario;
  
  readonly tiposRoca = Object.values(TipoRoca);
  readonly tamaniosGrano = Object.values(TamanoGrano);
  readonly texturas = Object.values(Textura);
  readonly clasificaciones = Object.values(Clasificacion);

  constructor(
    public configSvc: ConfiguracionService,
    private formExtendido: MineralFormExtendidoService,
    private formReducido: MineralFormReducidoService
  ) {}

  get formularioActivo() {
    return this.configSvc.modo() === ModoFormulario.Extendido
      ? this.formExtendido.formulario
      : this.formReducido.formulario;
  }

  analizar(): void {
    const form = this.formularioActivo;
    
    if (form.invalid) {
      form.markAllAsTouched();
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

    this.mineralAnalizado.emit(mineral);
  }

  limpiar(): void {
    if (this.configSvc.modo() === ModoFormulario.Extendido) {
      this.formExtendido.reset();
    } else {
      this.formReducido.reset();
    }
  }
}
