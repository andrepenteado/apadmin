import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CoreModule } from "../../libs/core/core.module";
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxLoadingModule } from "ngx-loading"


@NgModule({
  declarations: [
    CadastroComponent,
    PesquisarComponent
  ],
    imports: [
        CommonModule,
        CargoRoutingModule,
        CoreModule,
        DataTablesModule,
        ReactiveFormsModule,
        NgxLoadingModule.forRoot({})
    ]
})
export class CargoModule { }
