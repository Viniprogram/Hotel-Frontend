import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Usuario } from "./usuario.model";
import { element } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 private usuarioUrl = 'http://localhost:8000/api/hotel/usuarios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Usuario[]>{
    return this.http.get(this.usuarioUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataToUsuarios)
    )
  }

  getById(id: number): Observable<Usuario>{
    const url = `${this.usuarioUrl}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToUsuario)
    )
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post(this.usuarioUrl, usuario).pipe(
      catchError(this.handleError),
      map(this.jsonDataToUsuario)
    )
  }

  update(usuario: Usuario): Observable<Usuario>{
    const url = `${this.usuarioUrl}/${usuario.id}`;

    return this.http.put(url, usuario).pipe(
      catchError(this.handleError),
      map(() => usuario)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.usuarioUrl}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

//Métodos privados

private jsonDataToUsuarios(jsonData: any[]): Usuario[]{
  const usuarios: Usuario[] = [];
  jsonData.forEach(element => usuarios.push(element as Usuario));
  return usuarios;
  } 

  private jsonDataToUsuario(jsonData: any): Usuario{
    return jsonData as Usuario;
  }

  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }
}

//<any[]>(`${this.usuarioUrl}`);