import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ApartamentosRoutingModule } from './apartamentos-routing.module';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';

@NgModule({
  declarations: [ApartamentoListComponent, ApartamentoFormComponent],
  imports: [
    CommonModule,
    ApartamentosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ApartamentosModule { }
