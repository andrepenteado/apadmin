import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Colaborador } from "../model/entities/colaborador";
import { API_COLABORADORES } from "../etc/api";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(
    private http: HttpClient
  ) { }

  public listar(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${environment.backendURL}${API_COLABORADORES}`);
  }

  public buscar(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${environment.backendURL}${API_COLABORADORES}/${id}`);
  }

  public incluir(colaborador: any): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${environment.backendURL}${API_COLABORADORES}`, colaborador);
  }

  public alterar(colaborador: any): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${environment.backendURL}${API_COLABORADORES}/${colaborador.id}`, colaborador);
  }

  public excluir(id: number): Observable<any> {
    return this.http.delete(`${environment.backendURL}${API_COLABORADORES}/${id}`);
  }

  public compareFn(c1: Colaborador, c2: Colaborador): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
