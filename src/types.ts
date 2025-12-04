// src/types.ts
/*
export enum TipoRoca {
  Ignea = 'Ígneas',
  Metamorfica = 'metamórficas',
  Sedimentaria = 'sedimentarias'
}

export enum TamanoGrano {
  MuyGrueso = 'muy grueso',
  Grueso = 'grueso',
  Medio = 'medio',
  Fino = 'fino'
}

export enum Textura {
  Vitrea = 'vítrea',
  Afanitica = 'afanítica',
  Faneritica = 'fanerítica'
}

export enum Clasificacion {
  Construccion = 'construcción',
  Ornamental = 'ornamental',
  Utensilios = 'utensilios',
  Machacadas = 'machacadas'
}
*/

export enum TipoRoca {
  Ignea = 'Ígneas',
  Metamorfica = 'Metamórficas',
  Sedimentaria = 'Sedimentarias'
}

export enum TamanoGrano {
  MuyGrueso = 'Muy grueso',
  Grueso = 'Grueso',
  Medio = 'Medio',
  Fino = 'Fino'
}

export enum Textura {
  Vitrea = 'Vítrea',
  Afanitica = 'Afanítica',
  Faneritica = 'Fanerítica'
}

export enum Clasificacion {
  Construccion = 'Construcción',
  Ornamental = 'Ornamental',
  Utensilios = 'Utensilios',
  Machacadas = 'Machacadas'
}

export interface Mineral {
  id: string;
  nombre: string;
  grupo: TipoRoca;
  dureza: number;
  tamanoGrano: TamanoGrano;
  clasificacion: Clasificacion;
  tamanoCristales: number;
  temperaturaFormacion: number;
  estructura: string;
  formaGranos: string;
  textura: Textura;
}

// Traducciones para formato americano
/*
export const TRADUCCIONES_EN: Record<string, string> = {
  'ígneas': 'igneous',
  'metamórficas': 'metamorphic',
  'sedimentarias': 'sedimentary',
  'muy grueso': 'very coarse',
  'grueso': 'coarse',
  'medio': 'medium',
  'fino': 'fine',
  'vítrea': 'vitreous',
  'afanítica': 'aphanitic',
  'fanerítica': 'phaneritic',
  'construcción': 'construction',
  'ornamental': 'ornamental',
  'utensilios': 'utensils',
  'machacadas': 'crushed'
};
*/
export const TRADUCCIONES_EN: Record<string, string> = {
  'Ígneas': 'Igneous',
  'Metamórficas': 'Metamorphic',
  'Sedimentarias': 'Sedimentary',
  'Muy grueso': 'Very coarse',
  'Grueso': 'Coarse',
  'Medio': 'Medium',
  'Fino': 'Fine',
  'Vítrea': 'Vitreous',
  'Afanítica': 'Aphanitic',
  'Fanerítica': 'Phaneritic',
  'Construcción': 'Construction',
  'Ornamental': 'Ornamental',
  'Utensilios': 'Utensils',
  'Machacadas': 'Crushed'
}
