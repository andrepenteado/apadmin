import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Empresa } from "../model/entities/empresa";
import { Api } from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${environment.backendURL}${Api.EMPRESAS}`);
  }

  public buscar(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${environment.backendURL}${Api.EMPRESAS}/${id}`);
  }

  public gravar(empresa: any): Observable<Empresa> {
    return this.http.post<Empresa>(`${environment.backendURL}${Api.EMPRESAS}`, empresa);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${Api.EMPRESAS}/${id}`);
  }

}
