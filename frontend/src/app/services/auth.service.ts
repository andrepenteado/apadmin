import { Injectable } from '@angular/core';
import { UserLogin } from "../model/dtos/user-login";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Api } from "../config/api";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public async usuarioLogado(): Promise<UserLogin> {
    let userLogin = new UserLogin(); //JSON.parse(sessionStorage.getItem("usuarioLogado")!) as UserLogin;
    /*if (userLogin == null) {
      const userLogin$ = this.http.get<UserLogin>(`${environment.backendURL}${Api.AUTH}/usuario`);
      userLogin = await lastValueFrom(userLogin$);
      if (userLogin != null)
        sessionStorage.setItem("usuarioLogado", JSON.stringify(userLogin));
    }
    if (!this.isPermitido(userLogin))
      await this.router.navigate(["/pages/acesso-negado"]);*/
    return userLogin;
  }

  public logout(): void {
    sessionStorage.clear();
    window.location.href = '/logout';
  }

  public voltarAoPortal(): void {
    sessionStorage.clear();
    window.location.href = environment.portalURL;
  }

  public nomePerfil(userLogin: UserLogin): string {
    /*for (const nome of Object.keys(userLogin.perfis)) {
      console.log(nome);
      if (nome.startsWith("ROLE_AProove_"))
        return userLogin.perfis.get(nome)!;
    }*/
    return "Sem Perfil";
  }

  isPermitido(userLogin: UserLogin): boolean {
    if (userLogin == null)
      return false;
    if (userLogin.perfis == null || userLogin.perfis.size < 1)
      return false;
    if (this.nomePerfil(userLogin) == "Sem Perfil")
      return false;
    return true;
  }

}
