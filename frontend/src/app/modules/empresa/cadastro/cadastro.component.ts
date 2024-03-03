import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DecoracaoMensagem, ExibeMensagemComponent } from "../../core/components/exibe-mensagem.component";
import { ActivatedRoute } from "@angular/router";
import { EmpresaService } from "../../../services/empresa.service";
import { Empresa } from "../../../model/entities/empresa";
import { ViaCepService } from "../../../services/via-cep.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: [
  ]
})
export class CadastroComponent implements OnInit {

  @ViewChild('exibeMensagem')
  exibeMensagem: ExibeMensagemComponent = new ExibeMensagemComponent();

  aguardar = true;
  formEnviado = false;
  empresa: Empresa;
  dataCadastro: Date = new Date();
  dataUltimaModificacao: Date = new Date();

  id = new FormControl(null);
  nomeFantasia = new FormControl(null, Validators.required);
  razaoSocial = new FormControl(null, Validators.required);
  cnpj = new FormControl(null, Validators.required);
  telefone = new FormControl(null, Validators.required);
  email = new FormControl(null);
  cep = new FormControl(null);
  logradouro = new FormControl(null);
  complemento = new FormControl(null);
  numeroLogradouro = new FormControl(null);
  bairro = new FormControl(null);
  cidade = new FormControl(null);
  estado = new FormControl(null);
  form = new FormGroup({
    id: this.id,
    nomeFantasia: this.nomeFantasia,
    razaoSocial: this.razaoSocial,
    cnpj: this.cnpj,
    telefone: this.telefone,
    email: this.email,
    cep: this.cep,
    logradouro: this.logradouro,
    complemento: this.complemento,
    numeroLogradouro: this.numeroLogradouro,
    bairro: this.bairro,
    cidade: this.cidade,
    estado: this.estado
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    private viaCepService: ViaCepService
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      const id: number = params.id;
      if (id)
        this.pesquisar(id);
    });
    this.aguardar = false;
  }

  pesquisar(id: number) {
    this.empresaService.buscar(id).subscribe(empresa => {
      this.empresa = empresa;
      this.dataCadastro = new Date(empresa.dataCadastro);
      this.dataUltimaModificacao = new Date(empresa.dataUltimaAtualizacao);
      this.form.patchValue(empresa);
    });
  }

  gravar() {
    this.formEnviado = true;
    if (this.form.valid) {
      this.empresaService.gravar(this.form.value).subscribe({
        next: empresa => {
          this.empresa = empresa;
          this.form.reset();
          this.form.patchValue(empresa);
          this.exibeMensagem.show(
            `Dados da empresa ${empresa.nomeFantasia} gravados com sucesso`,
            DecoracaoMensagem.SUCESSO,
            'Gravar Sistema'
          );
        },
        error: objetoErro => {
          this.exibeMensagem.show(
            `${objetoErro.error.detail}`,
            DecoracaoMensagem.ERRO,
            'Erro de processamento'
          );
        }
      });
    }
  }

  consultaCep = (cep: string) => {
    cep = cep.replace('-', '');
    this.logradouro.setValue('');
    this.bairro.setValue('');
    this.cidade.setValue('');
    this.estado.setValue('');
    this.viaCepService.consultarCep(cep).subscribe({
      next: endereco => {
        if (endereco.erro) {
          this.exibeMensagem.show(
            'CEP não encontrado ou incorreto',
            DecoracaoMensagem.INFO,
            'Pesquisar CEP',
          );
        }
        else {
          this.logradouro.setValue(endereco.logradouro);
          this.bairro.setValue(endereco.bairro);
          this.cidade.setValue(endereco.localidade);
          this.estado.setValue(endereco.uf);
        }
      },
      error: () => {
        this.exibeMensagem.show(
          'Não foi possível consultar o CEP',
          DecoracaoMensagem.ERRO,
          'Erro de processamento'
        );
      }
    });
  }

}
