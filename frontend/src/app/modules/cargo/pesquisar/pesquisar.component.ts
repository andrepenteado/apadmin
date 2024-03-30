import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { DATATABLES_OPTIONS } from "../../../etc/datatables";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { DecoracaoMensagem, ExibirMensagemService } from "../../../libs/core/widgets/exibir-mensagem.service";
import { Cargo } from "../../../model/entities/cargo";
import { CargoService } from "../../../services/cargo.service";

@Component({
  selector: 'apadmin-cargo-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: ``
})
export class PesquisarComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = DATATABLES_OPTIONS;
  dtTrigger: Subject<any> = new Subject<any>();

  lista: Cargo[] = [];

  constructor(
    private cargoService: CargoService,
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
    this.cargoService
      .listar()
      .subscribe({
          next: listaCargos => {
            this.lista = listaCargos;
            this.rerender();
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
    this.router.navigate([`/cargo/cadastro`]);
  }

  editar(cargo: Cargo): void {
    this.router.navigate([`/cargo/cadastro/${cargo.id}`]);
  }

  excluir(cargo: Cargo): void {
    this.exibirMensagem
      .showConfirm(`Confirma a exclusão do cargo ${cargo.nome}`, "Excluir?")
      .then((resposta) => {
          if (resposta.value) {
            this.cargoService.excluir(cargo.id).subscribe({
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

}