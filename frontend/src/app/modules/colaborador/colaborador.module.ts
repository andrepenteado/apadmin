import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CoreModule } from "../../libs/core/core.module";
import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { NgxLoadingModule } from "ngx-loading"


@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
    imports: [
        CommonModule,
        ColaboradorRoutingModule,
        CoreModule,
        DataTablesModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe,
        NgxLoadingModule.forRoot({})
    ],
  providers: [provideNgxMask()]
})
export class ColaboradorModule { }
