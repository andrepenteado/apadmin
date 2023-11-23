package com.github.andrepenteado.admin.model.entities;

import com.github.andrepenteado.admin.model.enums.TipoUnidadeAdministrativa;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
public class UnidadeAdministrativa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Nome é um campo obrigatório")
    private String nome;

    @NotNull(message = "Tipo é um campo obrigatório")
    @Enumerated(EnumType.STRING)
    private TipoUnidadeAdministrativa tipo;

    @ManyToOne
    @JoinColumn(name = "fk_empresa")
    @NotNull(message = "Empresa é um campo obrigatório")
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "fk_unidade_administrativa_superior")
    private UnidadeAdministrativa unidadeAdministrativaSuperior;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoUnidadeAdministrativa getTipo() {
        return tipo;
    }

    public void setTipo(TipoUnidadeAdministrativa tipo) {
        this.tipo = tipo;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }

    public UnidadeAdministrativa getUnidadeAdministrativaSuperior() {
        return unidadeAdministrativaSuperior;
    }

    public void setUnidadeAdministrativaSuperior(UnidadeAdministrativa unidadeAdministrativaSuperior) {
        this.unidadeAdministrativaSuperior = unidadeAdministrativaSuperior;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UnidadeAdministrativa that = (UnidadeAdministrativa) o;
        return Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        final StringBuffer sb = new StringBuffer("UnidadeAdministrativa{");
        sb.append("id=").append(id);
        sb.append(", nome='").append(nome).append('\'');
        sb.append(", tipo=").append(tipo);
        sb.append('}');
        return sb.toString();
    }
}