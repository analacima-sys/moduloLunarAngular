// src/app/pipes/traducir-enum.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traducirEnum',
  standalone: true
})
export class TraducirEnumPipe implements PipeTransform {
  private traducciones: { [key: string]: { 'es-ES': string, 'en-US': string } } = {
    // Modos de formulario
    'Extendido': { 'es-ES': 'Extendido', 'en-US': 'Extended' },
    'Reducido': { 'es-ES': 'Reducido', 'en-US': 'Reduced' },
    
    // Formatos de salida
    'Europeo': { 'es-ES': 'Europeo', 'en-US': 'European' },
    'Americano': { 'es-ES': 'Americano', 'en-US': 'American' },
    
    // Tipos de roca / Criterios - Mayúscula (para desplegables)
    'Ígneas': { 'es-ES': 'Ígneas', 'en-US': 'Igneous' },
    'Metamórficas': { 'es-ES': 'Metamórficas', 'en-US': 'Metamorphic' },
    'Sedimentarias': { 'es-ES': 'Sedimentarias', 'en-US': 'Sedimentary' },
    
    // Criterios - Minúscula (para resultados)
    'ígneas': { 'es-ES': 'ígneas', 'en-US': 'igneous' },
    'metamórficas': { 'es-ES': 'metamórficas', 'en-US': 'metamorphic' },
    'sedimentarias': { 'es-ES': 'sedimentarias', 'en-US': 'sedimentary' },
  
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