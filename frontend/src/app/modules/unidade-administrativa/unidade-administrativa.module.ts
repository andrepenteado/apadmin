import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeAdministrativaRoutingModule } from './unidade-administrativa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CoreModule } from "../../libs/core/core.module";
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    UnidadeAdministrativaRoutingModule,
    CoreModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class UnidadeAdministrativaModule { }
