import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Apartamento } from "./apartamento.model"; 

@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {

  private apartamentoUrl = 'http://localhost:8000/api/hotel/atendimento/apartamentos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Apartamento[]>{
    return this.http.get(this.apartamentoUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataToApartamentos)
    )
  }

  getById(id: number): Observable<Apartamento>{
    const url = `${this.apartamentoUrl}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToApartamento)
    )
  }

  create(apartamento: Apartamento): Observable<Apartamento>{
    return this.http.post(this.apartamentoUrl, apartamento).pipe(
      catchError(this.handleError),
      map(this.jsonDataToApartamento)
    )
  }

  update(apartamento: Apartamento): Observable<Apartamento>{
    const url = `${this.apartamentoUrl}/${apartamento.id}`;

    return this.http.put(url, apartamento).pipe(
      catchError(this.handleError),
      map(this.jsonDataToApartamento)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.apartamentoUrl}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  reserva(apartamento: Apartamento): Observable<Apartamento>{
    const url = `${this.apartamentoUrl}/${apartamento.id}`;

    return this.http.put(url, apartamento).pipe(
      catchError(this.handleError),
      map(this.jsonDataToApartamento)
    )
  }

//Métodos privados

private jsonDataToApartamentos(jsonData: any[]): Apartamento[]{
  const apartamentos: Apartamento[] = [];
  jsonData.forEach(element => apartamentos.push(element as Apartamento));
  return apartamentos;
  } 

  private jsonDataToApartamento(jsonData: any): Apartamento{
    return jsonData as Apartamento;
  }

  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }
}
