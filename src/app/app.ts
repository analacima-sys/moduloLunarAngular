import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Visor } from "./visor/visor";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Visor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
currentLocale: any;
toggleLocale() {
throw new Error('Method not implemented.');
}
  protected readonly title = signal('moduloLunarAngular');
}
