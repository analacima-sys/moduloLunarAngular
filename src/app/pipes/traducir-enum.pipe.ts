// src/app/pipes/traducir-enum.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirEnum',
  standalone: true
})
export class TraducirEnumPipe implements PipeTransform {
  private traducciones: { [key: string]: { 'es-ES': string, 'en-US': string } } = {
    // Criterios de validación
    'Criterio ígneas': { 'es-ES': 'Criterio ígneas', 'en-US': 'Igneous criterion' },
    'Criterio metamórficas': { 'es-ES': 'Criterio metamórficas', 'en-US': 'Metamorphic criterion' },
    'Criterio sedimentarias': { 'es-ES': 'Criterio sedimentarias', 'en-US': 'Sedimentary criterion' },
    
    // Tipos de roca
    'Ígneas': { 'es-ES': 'Ígneas', 'en-US': 'Igneous' },
    'Metamórficas': { 'es-ES': 'Metamórficas', 'en-US': 'Metamorphic' },
    'Sedimentarias': { 'es-ES': 'Sedimentarias', 'en-US': 'Sedimentary' },
    
    // Tamaño de grano
    'Muy grueso': { 'es-ES': 'Muy grueso', 'en-US': 'Very coarse' },
    'Grueso': { 'es-ES': 'Grueso', 'en-US': 'Coarse' },
    'Medio': { 'es-ES': 'Medio', 'en-US': 'Medium' },
    'Fino': { 'es-ES': 'Fino', 'en-US': 'Fine' },
    
    // Textura
    'Vítrea': { 'es-ES': 'Vítrea', 'en-US': 'Vitreous' },
    'Afanítica': { 'es-ES': 'Afanítica', 'en-US': 'Aphanitic' },
    'Fanerítica': { 'es-ES': 'Fanerítica', 'en-US': 'Phaneritic' },
    
    // Clasificación
    'Construcción': { 'es-ES': 'Construcción', 'en-US': 'Construction' },
    'Ornamental': { 'es-ES': 'Ornamental', 'en-US': 'Ornamental' },
    'Utensilios': { 'es-ES': 'Utensilios', 'en-US': 'Utensils' },
    'Machacadas': { 'es-ES': 'Machacadas', 'en-US': 'Crushed' }
  };

  transform(valor: string, locale: string = 'es-ES'): string {
    const traduccion = this.traducciones[valor];
    if (!traduccion) {
      return valor; // Si no encuentra traducción, devuelve el original
    }
    return traduccion[locale as 'es-ES' | 'en-US'] || valor;
  }
}
