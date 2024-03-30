import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTablesModule } from "angular-datatables";
import { CoreModule } from "../../libs/core/core.module"
import { NgbToast } from "@ng-bootstrap/ng-bootstrap"
import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    DataTablesModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask()]
})
export class EmpresaModule { }
