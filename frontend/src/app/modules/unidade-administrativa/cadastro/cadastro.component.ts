import { Component, ViewChild } from '@angular/core';
import { ExibeMensagemComponent } from "../../core/components/exibe-mensagem.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TipoUnidadeAdministrativa } from "../../../model/enums/tipo-unidade-administrativa";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: [
  ]
})
export class CadastroComponent {

  @ViewChild('exibeMensagem')
  exibeMensagem: ExibeMensagemComponent = new ExibeMensagemComponent();

  formUnidadeAdministrativaEnviado = false;
  dataCadastroFormatada = new Date();

  tipos = Object.keys(TipoUnidadeAdministrativa);
  enumTipo: { [key: string]: TipoUnidadeAdministrativa } = TipoUnidadeAdministrativa;

  id = new FormControl(null);
  dataCadastro = new FormControl(null);
  nome = new FormControl(null, Validators.required);
  tipo = new FormControl(0);
  formUnidadeAdministrativa = new FormGroup({
    id: this.id,
    dataCadastro: this.dataCadastro,
    nome: this.nome,
    tipo: this.tipo
  });

  gravar() {}

}
