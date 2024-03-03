import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cargo } from "../model/entities/cargo";
import { environment } from "../../environments/environment";
import { Api } from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${environment.backendURL}${Api.CARGOS}`);
  }

  public buscar(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${environment.backendURL}${Api.CARGOS}/${id}`);
  }

  public gravar(cargo: any): Observable<Cargo> {
    return this.http.post<Cargo>(`${environment.backendURL}${Api.CARGOS}`, cargo);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${Api.CARGOS}/${id}`);
  }

}
