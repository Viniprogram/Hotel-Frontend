import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaFormComponent } from "./reserva-form/reserva-form.component";

const routes: Routes = [
  { path: ':id/reserva', component: ReservaFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
