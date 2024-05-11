import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Cargo } from "../../../model/entities/cargo";
import { CargoService } from "../../../services/cargo.service";
import { ngxLoadingAnimationTypes } from "ngx-loading"
import { DATATABLES_OPTIONS, DecoracaoMensagem, ExibirMensagemService } from "@andrepenteado/ngx-apcore"

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
  aguardar = true;

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
            this.aguardar = false;
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
              }
            });
          }
        }
      );
  }

  protected readonly ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
}
