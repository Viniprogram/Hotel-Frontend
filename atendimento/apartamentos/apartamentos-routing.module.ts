import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartamentoListComponent } from "./apartamento-list/apartamento-list.component"; 
import { ApartamentoFormComponent } from "./apartamento-form/apartamento-form.component";
import { ReservaFormComponent } from '../reservas/reserva-form/reserva-form.component';

const routes: Routes = [
  { path: '', component: ApartamentoListComponent },
  { path: 'new', component: ApartamentoFormComponent },
  { path: ':id/edit', component: ApartamentoFormComponent }, 
  { path: ':id/reserva', component: ReservaFormComponent } 
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartamentosRoutingModule { }
