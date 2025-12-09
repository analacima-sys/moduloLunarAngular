// src/app/services/astronauta.service.ts
import { Injectable } from '@angular/core';
import { Astronauta } from '../models/astronauta.model';

@Injectable({ providedIn: 'root' })
export class AstronautaService {
  readonly astronauta: Astronauta;

  constructor() {
    this.astronauta = new Astronauta('AH31639', 'Agmunsen Haakon', 41);
  }
}
