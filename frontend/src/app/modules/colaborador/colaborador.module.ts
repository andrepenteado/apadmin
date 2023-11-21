import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColaboradorRoutingModule } from './colaborador-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../core/core.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";


@NgModule({
  declarations: [
    CadastroComponent,
    PesquisarComponent
  ],
  imports: [
    CommonModule,
    ColaboradorRoutingModule,
    SharedModule,
    CoreModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()]
})
export class ColaboradorModule { }
