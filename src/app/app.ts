// src/app/app.ts
import { Component } from '@angular/core';
import { MineralComponent } from './components/mineral/mineral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MineralComponent],
  template: `
  <div class="container"> 
      <app-mineral></app-mineral>
</div>
  `
})
export class App {
  title = 'Módulo Lunar Angular';
}