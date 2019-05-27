import { Component, OnInit } from '@angular/core';

import { Hospede } from "../shared/hospede.model";
import { HospedeService } from "../shared/hospede.service";
import { element } from '@angular/core/src/render3';
import * as toastr from "toastr"; 

@Component({
  selector: 'app-hospede-list',
  templateUrl: './hospede-list.component.html',
  styleUrls: ['./hospede-list.component.css']
})
export class HospedeListComponent implements OnInit { 

  hospedes: Hospede[] = [];   

  constructor(private hospedeService: HospedeService) { }

  ngOnInit() {
    this.hospedeService.getAll().subscribe(
      hospedes => this.hospedes = hospedes,
      error => alert("Erro ao carregar a lista de hospedes") 
    )     
  }
}
