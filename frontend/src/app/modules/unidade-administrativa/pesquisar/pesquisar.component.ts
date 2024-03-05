import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DecoracaoMensagem, ExibeMensagemComponent } from "../../core/components/exibe-mensagem.component"
import { Core } from "../../../config/core"
import { Subject } from "rxjs"
import { Router } from "@angular/router"
import Swal from "sweetalert2"
import { UnidadeAdministrativa } from "../../../model/entities/unidade-administrativa"
import { UnidadeAdministrativaService } from "../../../services/unidade-administrativa.service"

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: [
  ]
})
export class PesquisarComponent implements OnInit, OnDestroy {

  @ViewChild('exibeMensagem')
  exibeMensagem: ExibeMensagemComponent = new ExibeMensagemComponent();

  aguardar = true;

  dtOptions: DataTables.Settings = Core.DATATABLES_OPTIONS;
  dtTrigger: Subject<any> = new Subject<any>();

  lista: UnidadeAdministrativa[];

  constructor(
    private unidadeAdministrativaService: UnidadeAdministrativaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  pesquisar(): void {
    this.unidadeAdministrativaService.listar().subscribe({
      next: lista => {
        this.lista = lista;
        this.dtTrigger.next(null);
        this.aguardar = false;
      },
      error: objetoErro => {
        if (objetoErro.error.status == "403") {
          this.router.navigate(["/pages/acesso-negado"]);
        }
        else {
          this.exibeMensagem.show(
            `${objetoErro.error.detail}`,
            DecoracaoMensagem.ERRO,
            'Erro no processamento'
          );
        }
      }
    })
  }

  incluir(): void {
    this.router.navigate([`/unidade-administrativa/cadastro`]);
  }

  editar(unidadeAdministrativa): void {
    this.router.navigate([`/unidade-administrativa/cadastro/${unidadeAdministrativa.id}`]);
  }

  excluir(unidadeAdministrativa): void {
    Swal.fire({
      title: 'Excluir?',
      text: `Confirma a exclusão da unidade administrativa ${unidadeAdministrativa.nome}`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class=\'fa fa-trash\'></i> Sim, Excluir',
      cancelButtonText: 'Cancelar'
    }).then((resposta) => {
      if (resposta.value) {
        this.unidadeAdministrativaService.excluir(unidadeAdministrativa.id).subscribe({
          next: () => this.pesquisar(),
          error: objetoErro => {
            this.exibeMensagem.show(
              `${objetoErro.error.detail}`,
              DecoracaoMensagem.ERRO,
              'Erro de processamento'
            );
          }
        });
      }
    });
  }

}
