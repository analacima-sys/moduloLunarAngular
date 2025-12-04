// src/app/app.ts
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MineralComponent } from './components/mineral/mineral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, MineralComponent],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <app-mineral></app-mineral>
    </div>
  `
})
export class App {
  title = 'Módulo Lunar Angular';
}