import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule,
    CoreModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule
  ],
  providers: [provideNgxMask()]
})
export class EmpresaModule { }
