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
      
      // Nombre: requerido
      nombre: ['', Validators.required],
      
      // Grupo: ígneas, metamórficas, sedimentarias
      grupo: [TipoRoca.Ignea, Validators.required],
      
      // Dureza: escala Mohs, de 1 a 10
      dureza: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      
      // Tamaño de grano
      tamanoGrano: [TamanoGrano.Medio, Validators.required],
      
      // Clasificación
      clasificacion: [Clasificacion.Construccion, Validators.required],
      
      // Tamaño de cristales: de 0 a 10
      tamanoCristales: [5, [Validators.required, Validators.min(0), Validators.max(10)]],
      
      // Temperatura de formación: de -100 a 100 grados Kelvin
      temperaturaFormacion: [0, [Validators.required, Validators.min(-100), Validators.max(100)]],
      
      // Estructura: texto libre
      estructura: [''],
      
      // Forma de los granos: texto libre
      formaGranos: [''],
      
      // Textura
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