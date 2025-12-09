// src/app/services/mineral-form-extendido.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoRoca, TamanoGrano, Clasificacion, Textura } from '../../types';

@Injectable({ providedIn: 'root' })
export class MineralFormExtendidoService {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      // ID: 2 letras, 4 números, 2 letras (LLDDDDLL)
      id: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{4}[A-Za-z]{2}$/)]],
      
      nombre: ['', Validators.required],
      
      grupo: [TipoRoca.Ignea, Validators.required],
      
      dureza: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      
      tamanoGrano: [TamanoGrano.Medio, Validators.required],
      
      clasificacion: [Clasificacion.Construccion, Validators.required],
      
      tamanoCristales: [5, [Validators.required, Validators.min(0), Validators.max(10)]],
      
      temperaturaFormacion: [0, [Validators.required, Validators.min(-100), Validators.max(100)]],
      
      estructura: [''],
      
      formaGranos: [''],
      
      textura: [Textura.Vitrea, Validators.required]
    });
  }

  reset(): void {
    this.formulario.reset({
      id: '',
      nombre: '',
      grupo: TipoRoca.Ignea,
      dureza: 5,
      tamanoGrano: TamanoGrano.Medio,
      clasificacion: Clasificacion.Construccion,
      tamanoCristales: 5,
      temperaturaFormacion: 0,
      estructura: '',
      formaGranos: '',
      textura: Textura.Vitrea
    });
  }
}