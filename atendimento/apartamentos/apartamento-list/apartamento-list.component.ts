import { Component, OnInit } from '@angular/core';

import { Apartamento } from "../shared/apartamento.model";
import { ApartamentoService } from "../shared/apartamento.service";

@Component({
  selector: 'app-apartamento-list',
  templateUrl: './apartamento-list.component.html',
  styleUrls: ['./apartamento-list.component.css']
})
export class ApartamentoListComponent implements OnInit {   

  apartamentos: Apartamento[] = [];   

  constructor(
    private apartamentoService: ApartamentoService) { }

  ngOnInit() {
    this.apartamentoService.getAll().subscribe(
      apartamentos => this.apartamentos = apartamentos,
      error => alert("Erro ao carregar a lista de apartamentos") 
    )     
  }
}
