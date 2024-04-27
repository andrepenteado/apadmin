import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from "rxjs";
import { Empresa } from "../../../model/entities/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { ngxLoadingAnimationTypes } from "ngx-loading"
import { DATATABLES_OPTIONS, DecoracaoMensagem, ExibirMensagemService } from "@andrepenteado/ngx-apcore"

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: [
  ]
})
export class PesquisarComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = DATATABLES_OPTIONS;
  dtTrigger: Subject<any> = new Subject<any>();

  lista: Empresa[] = [];
  aguardar = true;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private exibirMensagem: ExibirMensagemService
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnInit(): void {
    this.pesquisar();
    this.aguardar
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
    this.empresaService
      .listar()
      .subscribe({
        next: listaEmpresas => {
          this.lista = listaEmpresas;
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
    this.router.navigate([`/empresa/cadastro`]);
  }

  editar(empresa: Empresa): void {
    this.router.navigate([`/empresa/cadastro/${empresa.id}`]);
  }

  excluir(empresa: Empresa): void {
    this.exibirMensagem
      .showConfirm(`Confirma a exclusão da empresa ${empresa.nomeFantasia}`, "Excluir?")
      .then((resposta) => {
        if (resposta.value) {
          this.empresaService.excluir(empresa.id).subscribe({
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
