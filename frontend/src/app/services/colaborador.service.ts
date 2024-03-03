import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Colaborador } from "../model/entities/colaborador";
import { environment } from "../../environments/environment";
import { Api } from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${environment.backendURL}${Api.COLABORADORES}`);
  }

  public buscar(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${environment.backendURL}${Api.COLABORADORES}/${id}`);
  }

  public gravar(colaborador: any): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${environment.backendURL}${Api.COLABORADORES}`, colaborador);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${Api.COLABORADORES}/${id}`);
  }

}
