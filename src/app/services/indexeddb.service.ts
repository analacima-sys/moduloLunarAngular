// src/app/services/indexeddb.service.ts
import { Injectable } from '@angular/core';
import { Mineral } from '../../types';
import { CriterioValidacion, FormatoSalida } from '../shared/enums';

export interface MineralGuardado {
  // ID único para IndexedDB (auto-incrementado)
  idRegistro?: number;
  
  // Datos del mineral (sin traducir)
  mineral: Mineral;
  
  // Metadatos del análisis
  criterioUsado: CriterioValidacion;
  esValido: boolean;
  
  // Metadatos de la sesión
  fechaAnalisis: string;  // ISO date
  localeAnalisis: string;  // 'es-ES' o 'en-US' (para referencia)
  formatoTemperatura: FormatoSalida;  // 'europeo' o 'americano'
}

@Injectable({ providedIn: 'root' })
export class IndexedDBService {
  private dbName = 'ModuloLunarDB';
  private dbVersion = 1;
  private storeName = 'minerales';
  private db: IDBDatabase | null = null;

  constructor() {
    this.initDB();
  }

  /**
   * Inicializa la base de datos IndexedDB
   */
  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Error al abrir IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB inicializada correctamente');
        resolve();
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Crear el object store si no existe
        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, {
            keyPath: 'idRegistro',
            autoIncrement: true
          });

          // Crear índices para búsquedas
          objectStore.createIndex('fechaAnalisis', 'fechaAnalisis', { unique: false });
          objectStore.createIndex('mineralId', 'mineral.id', { unique: false });
          objectStore.createIndex('esValido', 'esValido', { unique: false });

          console.log('Object store "minerales" creado');
        }
      };
    });
  }

  /**
   * Asegura que la base de datos está inicializada
   */
  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.initDB();
    }
    return this.db!;
  }

  /**
   * Guarda un mineral analizado en IndexedDB
   */
  async guardarMineral(
    mineral: Mineral,
    criterioUsado: CriterioValidacion,
    esValido: boolean,
    localeAnalisis: string,
    formatoTemperatura: FormatoSalida
  ): Promise<number> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);

      const mineralGuardado: MineralGuardado = {
        mineral,
        criterioUsado,
        esValido,
        fechaAnalisis: new Date().toISOString(),
        localeAnalisis,
        formatoTemperatura
      };

      const request = objectStore.add(mineralGuardado);

      request.onsuccess = () => {
        console.log('Mineral guardado con ID:', request.result);
        resolve(request.result as number);
      };

      request.onerror = () => {
        console.error('Error al guardar mineral:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Obtiene todos los minerales guardados
   */
  async obtenerTodos(): Promise<MineralGuardado[]> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Error al obtener minerales:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Obtiene solo los minerales válidos
   */
  async obtenerValidos(): Promise<MineralGuardado[]> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index('esValido');
          const keyRange = IDBKeyRange.only(true);
    const request = index.getAll(keyRange);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Error al obtener minerales válidos:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Elimina un mineral por su ID de registro
   */
  async eliminarMineral(idRegistro: number): Promise<void> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(idRegistro);

      request.onsuccess = () => {
        console.log('Mineral eliminado con ID:', idRegistro);
        resolve();
      };

      request.onerror = () => {
        console.error('Error al eliminar mineral:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Limpia toda la base de datos (útil para pruebas)
   */
  async limpiarTodo(): Promise<void> {
    const db = await this.ensureDB();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.clear();

      request.onsuccess = () => {
        console.log('Base de datos limpiada');
        resolve();
      };

      request.onerror = () => {
        console.error('Error al limpiar base de datos:', request.error);
        reject(request.error);
      };
    });
  }
}