import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadeAdministrativaRoutingModule } from './unidade-administrativa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore"
import { NgxLoadingModule } from "ngx-loading"

@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
    imports: [
      CommonModule,
      UnidadeAdministrativaRoutingModule,
      ReactiveFormsModule,
      NgxLoadingModule.forRoot({}),
      NgxApcoreModule
    ]
})
export class UnidadeAdministrativaModule { }
