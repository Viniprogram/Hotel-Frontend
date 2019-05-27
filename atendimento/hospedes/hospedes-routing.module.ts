import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HospedeListComponent } from "./hospede-list/hospede-list.component"; 
import { HospedeFormComponent } from "./hospede-form/hospede-form.component";  

const routes: Routes = [
  { path: '', component: HospedeListComponent },
  { path: 'new', component: HospedeFormComponent },
  { path: ':id/edit', component: HospedeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospedesRoutingModule { }
