// src/app/components/astronauta/astronauta.component.ts
import { Component, OnInit } from '@angular/core';
import { AstronautaService } from '../../services/astronauta.service';

@Component({
  selector: 'app-astronauta',
  templateUrl: './astronauta.html',
  styleUrls: ['./astronauta.css']
})
export class AstronautaComponent implements OnInit {
  constructor(public astronautaSvc: AstronautaService) {}

  ngOnInit(): void {
    // Los datos vienen del servicio
  }
}