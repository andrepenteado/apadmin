import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesquisarComponent } from "./pesquisar/pesquisar.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { clientId } from "../../etc/oauth2";
import { autorizarPerfilGuard } from "@andrepenteado/ngx-apcore";

const routes: Routes = [

  {
    path: 'pesquisar',
    component: PesquisarComponent,
    canActivate: [ autorizarPerfilGuard ],
    data: { perfisAutorizados: [`ROLE_${clientId}_ADMINISTRADOR`] }
  },

  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [ autorizarPerfilGuard ],
    data: { perfisAutorizados: [`ROLE_${clientId}_ADMINISTRADOR`] }
  },

  {
    path: 'cadastro/:id',
    component: CadastroComponent,
    canActivate: [ autorizarPerfilGuard ],
    data: { perfisAutorizados: [`ROLE_${clientId}_ADMINISTRADOR`] }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargoRoutingModule { }
