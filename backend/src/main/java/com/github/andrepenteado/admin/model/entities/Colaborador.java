package com.github.andrepenteado.admin.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @NotNull(message = "Data de cadastro é um campo obrigatório")
    private LocalDateTime dataCadastro;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dataUltimaAtualizacao;

    @NotNull(message = "Usuário responsável pelo cadastro é um campo obrigatório")
    private String usuarioCadastro;

    private String usuarioUltimaModificacao;

    @NotNull(message = "Nome é um campo obrigatório")
    private String nome;

    @NotNull(message = "CPF é um campo obrigatório")
    private Long cpf;

    @NotNull(message = "Telefone é um campo obrigatório")
    private String telefone;

    private String email;

    private Long cep;

    private String logradouro;

    private String complemento;

    private Long numeroLogradouro;

    private String bairro;

    private String cidade;

    private String estado;

    @ManyToOne
    @JoinColumn(name = "fk_unidade_administrativa")
    @NotNull(message = "Unidade administrativa é um campo obrigatório")
    private UnidadeAdministrativa unidadeAdministrativa;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataUltimaAtualizacao() {
        return dataUltimaAtualizacao;
    }

    public void setDataUltimaAtualizacao(LocalDateTime dataUltimaAtualizacao) {
        this.dataUltimaAtualizacao = dataUltimaAtualizacao;
    }

    public String getUsuarioCadastro() {
        return usuarioCadastro;
    }

    public void setUsuarioCadastro(String usuarioCadastro) {
        this.usuarioCadastro = usuarioCadastro;
    }

    public String getUsuarioUltimaModificacao() {
        return usuarioUltimaModificacao;
    }

    public void setUsuarioUltimaModificacao(String usuarioUltimaModificacao) {
        this.usuarioUltimaModificacao = usuarioUltimaModificacao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Long getCpf() {
        return cpf;
    }

    public void setCpf(Long cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getCep() {
        return cep;
    }

    public void setCep(Long cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Long getNumeroLogradouro() {
        return numeroLogradouro;
    }

    public void setNumeroLogradouro(Long numeroLogradouro) {
        this.numeroLogradouro = numeroLogradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public UnidadeAdministrativa getUnidadeAdministrativa() {
        return unidadeAdministrativa;
    }

    public void setUnidadeAdministrativa(UnidadeAdministrativa unidadeAdministrativa) {
        this.unidadeAdministrativa = unidadeAdministrativa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Colaborador that = (Colaborador) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getCpf(), that.getCpf());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCpf());
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("Colaborador{");
        sb.append("id=").append(id);
        sb.append(", nome='").append(nome).append('\'');
        sb.append(", cpf=").append(cpf);
        sb.append('}');
        return sb.toString();
    }
}