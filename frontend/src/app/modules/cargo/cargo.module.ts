import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxLoadingModule } from "ngx-loading"
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore"


@NgModule({
  declarations: [
    CadastroComponent,
    PesquisarComponent
  ],
    imports: [
        CommonModule,
        CargoRoutingModule,
        NgxApcoreModule,
        DataTablesModule,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({})
    ]
})
export class CargoModule { }
