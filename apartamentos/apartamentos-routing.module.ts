import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApartamentoListComponent } from "./apartamento-list/apartamento-list.component"; 
import { ApartamentoFormComponent } from "./apartamento-form/apartamento-form.component";  

const routes: Routes = [
  { path: '', component: ApartamentoListComponent },
  { path: 'new', component: ApartamentoFormComponent },
  { path: ':id/edit', component: ApartamentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartamentosRoutingModule { }
