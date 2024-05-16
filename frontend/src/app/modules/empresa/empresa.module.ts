import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { PesquisarComponent } from './pesquisar/pesquisar.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ReactiveFormsModule } from "@angular/forms"
import { NgxApcoreModule } from "@andrepenteado/ngx-apcore"
import { NgxLoadingModule } from "ngx-loading"
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"

@NgModule({
  declarations: [
    PesquisarComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxLoadingModule.forRoot({}),
    NgxApcoreModule
  ],
  providers: [provideNgxMask()]
})
export class EmpresaModule { }
