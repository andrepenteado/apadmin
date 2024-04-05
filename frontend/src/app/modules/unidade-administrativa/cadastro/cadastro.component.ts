import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UnidadeAdministrativa } from "../../../model/entities/unidade-administrativa";
import { ActivatedRoute } from "@angular/router";
import { DecoracaoMensagem, ExibirMensagemService } from "../../../libs/core/services/exibir-mensagem.service";
import { last, Observable } from "rxjs";
import { UnidadeAdministrativaService } from "../../../services/unidade-administrativa.service";
import { TipoUnidadeAdministrativa } from "../../../model/enums/tipo-unidade-administrativa";
import { Empresa } from "../../../model/entities/empresa";
import { EmpresaService } from "../../../services/empresa.service";

@Component({
  selector: 'apadmin-unidade-administrativa-cadastro',
  templateUrl: './cadastro.component.html',
  styles: ``
})
export class CadastroComponent implements OnInit {

  incluir = true;
  formEnviado = false;
  unidadeAdministrativa = new UnidadeAdministrativa();
  listaEmpresas: Empresa[] = [];

  tipos = Object.keys(TipoUnidadeAdministrativa);
  enumTipo: { [key: string]: TipoUnidadeAdministrativa } = TipoUnidadeAdministrativa;

  id = new FormControl(null);
  nome = new FormControl(null, Validators.required);
  tipo = new FormControl(null, Validators.required);
  empresa = new FormControl(this.listaEmpresas[0], Validators.required);
  form = new FormGroup({
    id: this.id,
    nome: this.nome,
    tipo: this.tipo,
    empresa: this.empresa
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private unidadeAdministrativaService: UnidadeAdministrativaService,
    protected empresaService: EmpresaService,
    private exibirMensagem: ExibirMensagemService
  ) { }

  ngOnInit() {
    this.pesquisarEmpresas();
    this.activedRoute.params.subscribe(params => {
      const id: number = params.id;
      if (id) {
        this.incluir = false;
        this.pesquisar(id);
      }
    });
  }

  pesquisar(id: number) {
    this.unidadeAdministrativaService.buscar(id).subscribe(unidadeAdministrativa => {
      this.unidadeAdministrativa = unidadeAdministrativa;
      this.form.patchValue(unidadeAdministrativa);
      this.form.get("empresa").setValue(unidadeAdministrativa.empresa);
    });
  }

  pesquisarEmpresas(): void {
    this.empresaService.listar().subscribe({
      next: listaEmpresas => {
        this.listaEmpresas = listaEmpresas;
      }
    });
  }

  gravar() {
    this.formEnviado = true;

    if (this.form.valid) {
      var unidadeAdministrativaAtualizada: Observable<UnidadeAdministrativa>;

      if (this.incluir)
        unidadeAdministrativaAtualizada = this.unidadeAdministrativaService.incluir(this.form.value);
      else
        unidadeAdministrativaAtualizada = this.unidadeAdministrativaService.alterar(this.form.value);

      unidadeAdministrativaAtualizada.subscribe({
        next: unidadeAdministrativa => {
          this.unidadeAdministrativa = unidadeAdministrativa;
          this.incluir = false;
          this.form.reset();
          this.form.patchValue(unidadeAdministrativa);
          this.exibirMensagem.showMessage(
            `Dados da unidade administrativa ${unidadeAdministrativa.nome} gravados com sucesso`,
            "Gravar unidade administrativa",
            DecoracaoMensagem.SUCESSO
          );
        },
        error: objetoErro => {
          this.exibirMensagem.showMessage(
            `${objetoErro.error.detail}`,
            "Erro no processamento",
            DecoracaoMensagem.ERRO
          );
        }
      });
    }
    else {
      this.exibirMensagem.showMessage(
        "Preencha todos os dados obrigatórios antes de gravar os dados",
        "Dados obrigatórios",
        DecoracaoMensagem.ATENCAO
      );
    }
  }

  protected readonly last = last;
}
