import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UnidadeAdministrativa } from "../model/entities/unidade-administrativa";
import { environment } from "../../environments/environment";
import { Api } from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class UnidadeAdministrativaService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<UnidadeAdministrativa[]> {
    return this.http.get<UnidadeAdministrativa[]>(`${environment.backendURL}${Api.UNIDADES_ADMINISTRATIVAS}`);
  }

  public buscar(id: number): Observable<UnidadeAdministrativa> {
    return this.http.get<UnidadeAdministrativa>(`${environment.backendURL}${Api.UNIDADES_ADMINISTRATIVAS}/${id}`);
  }

  public gravar(unidadeAdministrativa: any): Observable<UnidadeAdministrativa> {
    return this.http.post<UnidadeAdministrativa>(`${environment.backendURL}${Api.UNIDADES_ADMINISTRATIVAS}`, unidadeAdministrativa);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${Api.UNIDADES_ADMINISTRATIVAS}/${id}`);
  }

}
