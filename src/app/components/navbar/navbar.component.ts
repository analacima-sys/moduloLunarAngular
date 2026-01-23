// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautaComponent } from '../astronauta/astronauta';
import { PanelConfiguracionNavbarComponent } from '../panel-configuracion/panel-configuracion-navbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    AstronautaComponent,
    PanelConfiguracionNavbarComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuCollapsed = true;
}