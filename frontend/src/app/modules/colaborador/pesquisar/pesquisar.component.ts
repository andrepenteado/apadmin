import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Colaborador } from "../../../model/entities/colaborador";
import { ColaboradorService } from "../../../services/colaborador.service";
import { ngxLoadingAnimationTypes } from "ngx-loading"
import { DatatablesService, ExibirMensagemService } from "@andrepenteado/ngx-apcore"

@Component({
  selector: 'admin-colaborador-pesquisar',
  templateUrl: './pesquisar.component.html',
  styles: ``
})
export class PesquisarComponent implements OnInit {

  lista: Colaborador[] = [];
  aguardar = true;

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private exibirMensagem: ExibirMensagemService,
    private datatablesService: DatatablesService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar(): void {
    this.colaboradorService
      .listar()
      .subscribe({
          next: listaColaboradores => {
            this.lista = listaColaboradores;
            this.aguardar = false;
            setTimeout(() => {
              $('#datatable-pesquisar-colaboradores').DataTable(this.datatablesService.getOptions());
            }, 5);
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
                window.location.reload();
              }
            });
          }
        }
      );
  }

  protected readonly ngxLoadingAnimationTypes = ngxLoadingAnimationTypes
}
