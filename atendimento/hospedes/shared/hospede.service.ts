import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";
import { Hospede } from "./hospede.model"; 

@Injectable({
  providedIn: 'root'
})
export class HospedeService {

  private hospedeUrl = 'http://localhost:8000/api/hotel/atendimento/hospedes';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Hospede[]>{
    return this.http.get(this.hospedeUrl).pipe(
      catchError(this.handleError),
      map(this.jsonDataToHospedes)
    )
  }

  getById(id: number): Observable<Hospede>{
    const url = `${this.hospedeUrl}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToHospede)
    )
  }

  /*getEstadosBr(){
    return this.http.get('../../../../assets/dados/estadosbr.json').pipe(
      catchError(this.handleError),
      map((res: Response) => res.json())
    ) 
  }*/

  create(hospede: Hospede): Observable<Hospede>{
    return this.http.post(this.hospedeUrl, hospede).pipe(
      catchError(this.handleError),
      map(this.jsonDataToHospede)
    )
  }

  update(hospede: Hospede): Observable<Hospede>{
    const url = `${this.hospedeUrl}/${hospede.id}`;

    return this.http.put(url, hospede).pipe(
      catchError(this.handleError),
      map(this.jsonDataToHospede)
    )
  }

  delete(id: number): Observable<any>{
    const url = `${this.hospedeUrl}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

//Métodos privados

private jsonDataToHospedes(jsonData: any[]): Hospede[]{
  const hospedes: Hospede[] = [];
  jsonData.forEach(element => hospedes.push(element as Hospede));
  return hospedes;
  } 

  private jsonDataToHospede(jsonData: any): Hospede{
    return jsonData as Hospede;
  }

  private handleError(error: any): Observable<any>{
    console.log("ERRO NA REQUISIÇÃO =>", error);
    return throwError(error);
  }
}
