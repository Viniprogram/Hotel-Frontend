import { Component, OnInit } from '@angular/core';

import { Usuario } from "../shared/usuario.model";
import { UsuarioService } from "../shared/usuario.service";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getAll().subscribe(
      usuarios => this.usuarios = usuarios,
      error => alert("Erro ao carregar a lista de usuários")      
    )
  }

}
