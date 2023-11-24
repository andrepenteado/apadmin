import { Component, OnInit } from "@angular/core";
import { UserLogin } from "../../../../../model/dtos/user-login";
import { AuthService } from "../../../../../services/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {

  userLogin!: UserLogin;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.userLogin = await this.authService.usuarioLogado();
  }

  nomePerfil(): string {
    return this.authService.nomePerfil(this.userLogin);
  }

  logout(): void {
    this.authService.logout();
  }

  public voltarAoPortal(): void {
    this.authService.voltarAoPortal();
  }

}
