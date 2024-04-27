import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms"
import { NgxLoadingModule } from "ngx-loading"
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore"

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
    NgxApcoreModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [provideNgxMask()]
})
export class EmpresaModule { }
