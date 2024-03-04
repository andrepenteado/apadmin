import { Component, OnInit } from "@angular/core";
import { UserLogin } from "../../../../../model/dtos/user-login";
import { AuthService } from "../../../../../services/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {

  nomeUsuario: string;
  nomePerfil: string;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    var userLogin: UserLogin = await this.authService.usuarioLogado();
    this.nomeUsuario = userLogin.nome;
    this.nomePerfil = this.authService.nomePerfil(userLogin);
  }

  logout(): void {
    this.authService.logout();
  }

  public voltarAoPortal(): void {
    this.authService.voltarAoPortal();
  }

}
