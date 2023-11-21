import { Component, ViewChild } from '@angular/core';
import { ExibeMensagemComponent } from "../../core/components/exibe-mensagem.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: [
  ]
})
export class CadastroComponent {

  @ViewChild('exibeMensagem')
  exibeMensagem: ExibeMensagemComponent = new ExibeMensagemComponent();

  formColaboradorEnviado = false;
  dataCadastroFormatada = new Date();

  id = new FormControl(null);
  dataCadastro = new FormControl(null, Validators.required);
  nome = new FormControl(null, Validators.required);
  cpf = new FormControl(null, Validators.required);
  telefone = new FormControl(null, Validators.required);
  email = new FormControl(null);
  cep = new FormControl(null);
  logradouro = new FormControl(null);
  complemento = new FormControl(null);
  numeroLogradouro = new FormControl(null);
  bairro = new FormControl(null);
  cidade = new FormControl(null);
  estado = new FormControl(null);
  formColaborador = new FormGroup({
    id: this.id,
    dataCadastro: this.dataCadastro,
    nome: this.nome,
    cpf: this.cpf,
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

  gravar() {}

  consultaCep(cep: string) {}

}
