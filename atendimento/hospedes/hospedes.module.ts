import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { HospedesRoutingModule } from './hospedes-routing.module';
import { HospedeListComponent } from './hospede-list/hospede-list.component';
import { HospedeFormComponent } from './hospede-form/hospede-form.component';

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";
import { BrMasker4Module } from 'brmasker4';


@NgModule({
  declarations: [HospedeListComponent, HospedeFormComponent],
  imports: [
    CommonModule,
    HospedesRoutingModule,
    ReactiveFormsModule,    
    CalendarModule,
    IMaskModule,
    BrMasker4Module    
  ]
  
})
export class HospedesModule { }
