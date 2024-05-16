import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { API_UNIDADES_ADMINISTRATIVAS } from "../etc/api";
import { UnidadeAdministrativa } from "../model/entities/unidade-administrativa";

@Injectable({
  providedIn: 'root'
})
export class UnidadeAdministrativaService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<UnidadeAdministrativa[]> {
    return this.http.get<UnidadeAdministrativa[]>(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}`);
  }

  public listarPorEmpresa(idEmpresa: number): Observable<UnidadeAdministrativa[]> {
    return this.http.get<UnidadeAdministrativa[]>(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}/empresa/${idEmpresa}`);
  }

  public buscar(id: number): Observable<UnidadeAdministrativa> {
    return this.http.get<UnidadeAdministrativa>(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}/${id}`);
  }

  public incluir(unidadeAdministrativa: any): Observable<UnidadeAdministrativa> {
    return this.http.post<UnidadeAdministrativa>(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}`, unidadeAdministrativa);
  }

  public alterar(unidadeAdministrativa: any): Observable<UnidadeAdministrativa> {
    return this.http.put<UnidadeAdministrativa>(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}/${unidadeAdministrativa.id}`, unidadeAdministrativa);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${API_UNIDADES_ADMINISTRATIVAS}/${id}`);
  }

  public compareFn(ua1: UnidadeAdministrativa, ua2: UnidadeAdministrativa): boolean {
    return ua1 && ua2 ? ua1.id === ua2.id : ua1 === ua2;
  }

}
