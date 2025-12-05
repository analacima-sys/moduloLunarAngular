// src/app/components/astronauta/astronauta.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautaService } from '../../services/astronauta.service';

@Component({
  selector: 'app-astronauta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './astronauta.html',  
  styleUrls: ['./astronauta.css']    
})
export class AstronautaComponent {
  constructor(public astronautaSvc: AstronautaService) {}
}