import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cargo } from "../model/entities/cargo";
import { SISTEMA_URL } from "../etc/routes"
import { Api } from "../etc/api"
import { Empresa } from "../model/entities/empresa";

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${SISTEMA_URL.backendURL}${Api.CARGOS}`);
  }

  public listarPorEmpresa(idEmpresa: number): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${SISTEMA_URL.backendURL}${Api.CARGOS}/empresa/${idEmpresa}`);
  }

  public buscar(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${SISTEMA_URL.backendURL}${Api.CARGOS}/${id}`);
  }

  public incluir(cargo: any): Observable<Cargo> {
    return this.http.post<Cargo>(`${SISTEMA_URL.backendURL}${Api.CARGOS}`, cargo);
  }

  public alterar(cargo: any): Observable<Cargo> {
    return this.http.put<Cargo>(`${SISTEMA_URL.backendURL}${Api.CARGOS}/${cargo.id}`, cargo);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${SISTEMA_URL.backendURL}${Api.CARGOS}/${id}`);
  }

  public compareFn(c1: Cargo, c2: Cargo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
