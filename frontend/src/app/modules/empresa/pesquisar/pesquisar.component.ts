import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from "rxjs";
import { Core } from "../../../config/core";
import { DecoracaoMensagem, ExibeMensagemComponent } from "../../core/components/exibe-mensagem.component";
import { Empresa } from "../../../model/entities/empresa";
import { EmpresaService } from "../../../services/empresa.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

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

  lista: Empresa[];

  constructor(
    private empresaService: EmpresaService,
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
    this.empresaService.listar().subscribe({
      next: listaEmpresas => {
        this.lista = listaEmpresas;
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
    this.router.navigate([`/sistema/cadastro`]);
  }

  editar(empresa): void {
    this.router.navigate([`/sistema/cadastro/${empresa.id}`]);
  }

  excluir(empresa): void {
    Swal.fire({
      title: 'Excluir?',
      text: `Confirma a exclusão do sistema ${empresa.nomeFantasia}`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class=\'fa fa-trash\'></i> Sim, Excluir',
      cancelButtonText: 'Cancelar'
    }).then((resposta) => {
      if (resposta.value) {
        this.empresaService.excluir(empresa.id).subscribe({
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
