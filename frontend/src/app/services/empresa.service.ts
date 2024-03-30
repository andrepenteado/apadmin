import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Empresa } from "../model/entities/empresa";
import { SISTEMA_URL } from "../etc/routes"
import { Api } from "../etc/api"

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${SISTEMA_URL.backendURL}${Api.EMPRESAS}`);
  }

  public buscar(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${SISTEMA_URL.backendURL}${Api.EMPRESAS}/${id}`);
  }

  public incluir(empresa: any): Observable<Empresa> {
    return this.http.post<Empresa>(`${SISTEMA_URL.backendURL}${Api.EMPRESAS}`, empresa);
  }

  public alterar(empresa: any): Observable<Empresa> {
    return this.http.put<Empresa>(`${SISTEMA_URL.backendURL}${Api.EMPRESAS}/${empresa.id}`, empresa);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${SISTEMA_URL.backendURL}${Api.EMPRESAS}/${id}`);
  }

  public compareFn(e1: Empresa, e2: Empresa): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

}