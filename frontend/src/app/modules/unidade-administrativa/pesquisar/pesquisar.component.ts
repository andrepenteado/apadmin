import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { UnidadeAdministrativaService } from "../../../services/unidade-administrativa.service";
import { UnidadeAdministrativa } from "../../../model/entities/unidade-administrativa";
import { ngxLoadingAnimationTypes } from "ngx-loading"
import { DATATABLES_OPTIONS, DecoracaoMensagem, ExibirMensagemService } from "@andrepenteado/ngx-apcore"

@Component({
  selector: 'apadmin-unidade-administrativa-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: ``
})
export class PesquisarComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = DATATABLES_OPTIONS;
  dtTrigger: Subject<any> = new Subject<any>();

  lista: UnidadeAdministrativa[] = [];
  aguardar = true;

  constructor(
    private unidadeAdministrativaService: UnidadeAdministrativaService,
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
    this.unidadeAdministrativaService
      .listar()
      .subscribe({
          next: listaUnidadesAdministrativas => {
            this.lista = listaUnidadesAdministrativas;
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
    this.router.navigate([`/unidade-administrativa/cadastro`]);
  }

  editar(unidadeAdministrativa: UnidadeAdministrativa): void {
    this.router.navigate([`/unidade-administrativa/cadastro/${unidadeAdministrativa.id}`]);
  }

  excluir(unidadeAdministrativa: UnidadeAdministrativa): void {
    this.exibirMensagem
      .showConfirm(`Confirma a exclusão da unidade administrativa ${unidadeAdministrativa.nome}`, "Excluir?")
      .then((resposta) => {
          if (resposta.value) {
            this.unidadeAdministrativaService.excluir(unidadeAdministrativa.id).subscribe({
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
