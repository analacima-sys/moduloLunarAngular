// src/types.ts

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