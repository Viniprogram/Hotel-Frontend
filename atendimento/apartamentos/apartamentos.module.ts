import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { ApartamentosRoutingModule } from './apartamentos-routing.module';
import { ApartamentoListComponent } from './apartamento-list/apartamento-list.component';
import { ApartamentoFormComponent } from './apartamento-form/apartamento-form.component';
import { ReservaFormComponent } from '../reservas/reserva-form/reserva-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";

@NgModule({
  declarations: [ApartamentoListComponent, ApartamentoFormComponent, ReservaFormComponent],
  imports: [
    CommonModule,
    ApartamentosRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule    
  ]
})
export class ApartamentosModule { }
