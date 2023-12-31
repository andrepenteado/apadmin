import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeAdministrativaRoutingModule } from './unidade-administrativa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../core/core.module";


@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    UnidadeAdministrativaRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class UnidadeAdministrativaModule { }
