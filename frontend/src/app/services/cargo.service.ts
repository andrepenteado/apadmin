import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cargo } from "../model/entities/cargo";
import { environment } from "../../environments/environment"
import { API_CARGOS } from "../etc/api"

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${environment.backendURL}${API_CARGOS}`);
  }

  public listarPorEmpresa(idEmpresa: number): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${environment.backendURL}${API_CARGOS}/empresa/${idEmpresa}`);
  }

  public buscar(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${environment.backendURL}${API_CARGOS}/${id}`);
  }

  public incluir(cargo: any): Observable<Cargo> {
    return this.http.post<Cargo>(`${environment.backendURL}${API_CARGOS}`, cargo);
  }

  public alterar(cargo: any): Observable<Cargo> {
    return this.http.put<Cargo>(`${environment.backendURL}${API_CARGOS}/${cargo.id}`, cargo);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${API_CARGOS}/${id}`);
  }

  public compareFn(c1: Cargo, c2: Cargo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
