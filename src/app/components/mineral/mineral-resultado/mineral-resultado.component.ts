// src/app/components/mineral/mineral-resultado/mineral-resultado.component.ts
import { Component, input, LOCALE_ID, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mineral } from '../../../../types';
import { CriterioValidacion } from '../../../shared/enums';
import { TraducirEnumPipe } from '../../../pipes/traducir-enum.pipe';

@Component({
  selector: 'app-mineral-resultado',
  standalone: true,
  imports: [CommonModule, TraducirEnumPipe],
  template: `
    @if (esValido() !== null) {
      <div class="card mt-3" [ngClass]="esValido() ? 'border-success' : 'border-danger'">
        <div class="card-header" [ngClass]="esValido() ? 'bg-success text-white' : 'bg-danger text-white'">
          @if (esValido()) {
            <span i18n="@@mineral-resultado-valido">✓ Mineral válido</span>
          } @else {
            <span i18n="@@mineral-resultado-invalido">✗ Mineral no válido</span>
          }
        </div>
        <div class="card-body text-center">
          <div class="emoji-result">
            @if (esValido()) {
              <span>😄</span>
            } @else {
              <span>😢</span>
            }
          </div>
          <p class="mt-2">
            {{ mineral()?.nombre || 'El mineral' }}
            @if (esValido()) {
              <span i18n="@@mineral-resultado-cumple"> cumple </span>
            } @else {
              <span i18n="@@mineral-resultado-no-cumple"> no cumple </span>
            }
            <span i18n="@@mineral-resultado-criterio">el criterio</span> 
            {{ criterio().toLowerCase() | traducirEnum:locale }}.
          </p>
        </div>
      </div>
    }
  `
})
export class MineralResultadoComponent {
  // Signal inputs
  esValido = input<boolean | null>(null);
  mineral = input<Mineral | null>(null);
  criterio = input.required<CriterioValidacion>();
  
  // Inyecciones
  locale = inject(LOCALE_ID);
}
