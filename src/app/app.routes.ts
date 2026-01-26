import { Routes } from '@angular/router';
import { MineralComponent } from './components/mineral/mineral.component';
import { InventarioComponent } from './components/inventario/inventario.component';

export const routes: Routes = [
  { path: '', component: MineralComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: '**', redirectTo: '' }
];
