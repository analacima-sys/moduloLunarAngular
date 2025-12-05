// src/app/services/astronauta.service.ts
import { Injectable } from '@angular/core';
import { Astronauta } from '../models/astronauta.model';

@Injectable({ providedIn: 'root' })
export class AstronautaService {
  // Astronauta único para toda la aplicación
  readonly astronauta: Astronauta;

  constructor() {
    // Inicializar con los datos del astronauta
    this.astronauta = new Astronauta('AH31639', 'Agmunsen Haakon', 41);
  }
}
