import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth.service";
import { UserLogin } from "../../dtos/user-login";

@Component({
  selector: 'core-section-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  userLogin: UserLogin;

  constructor(
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.userLogin = await this.authService.usuarioLogado();
  }

  logout(): void {
    this.authService.logout();
  }

  voltarAoPortal(): void {
    this.authService.voltarAoPortal();
  }

}
