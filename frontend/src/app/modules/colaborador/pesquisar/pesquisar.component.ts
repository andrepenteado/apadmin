import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Colaborador } from "../../../model/entities/colaborador";
import { ColaboradorService } from "../../../services/colaborador.service";
import { ngxLoadingAnimationTypes } from "ngx-loading"
import { DATATABLES_OPTIONS, DecoracaoMensagem, ExibirMensagemService } from "@andrepenteado/ngx-apcore"

@Component({
  selector: 'apadmin-colaborador-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: ``
})
export class PesquisarComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = DATATABLES_OPTIONS;
  dtTrigger: Subject<any> = new Subject<any>();

  lista: Colaborador[] = [];
  aguardar = true;

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private exibirMensagem: ExibirMensagemService
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnInit(): void {
    this.pesquisar();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }

  pesquisar(): void {
    this.colaboradorService
      .listar()
      .subscribe({
          next: listaColaboradores => {
            this.lista = listaColaboradores;
            this.rerender();
            this.aguardar = false;
          },
          error: objetoErro => {
            if (objetoErro.error.status == "403") {
              this.router.navigate(["/acesso-negado"]);
            }
            else {
              this.exibirMensagem.showMessage(`${objetoErro.error.detail}`, "Erro de processamento", DecoracaoMensagem.ERRO);
            }
          }
        }
      );
  }

  incluir(): void {
    this.router.navigate([`/colaborador/cadastro`]);
  }

  editar(colaborador: Colaborador): void {
    this.router.navigate([`/colaborador/cadastro/${colaborador.id}`]);
  }

  excluir(colaborador: Colaborador): void {
    this.exibirMensagem
      .showConfirm(`Confirma a exclusão do colaborador ${colaborador.nome}`, "Excluir?")
      .then((resposta) => {
          if (resposta.value) {
            this.colaboradorService.excluir(colaborador.id).subscribe({
              next: () => {
                this.pesquisar()
              },
              error: objetoErro => {
                this.exibirMensagem.showMessage(`${objetoErro.error.detail}`, "Erro de processamento", DecoracaoMensagem.ERRO);
              }
            });
          }
        }
      );
  }

  protected readonly ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
}
