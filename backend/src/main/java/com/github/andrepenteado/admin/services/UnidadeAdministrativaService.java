package com.github.andrepenteado.admin.services;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.model.entities.UnidadeAdministrativa;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface UnidadeAdministrativaService {

    List<UnidadeAdministrativa> listar();

    List<UnidadeAdministrativa> listarPorEmpresa(Long idEmpresa);

    Optional<UnidadeAdministrativa> buscar(Long id);

    UnidadeAdministrativa incluir(UnidadeAdministrativa unidadeAdministrativa, BindingResult validacao);

    UnidadeAdministrativa alterar(UnidadeAdministrativa unidadeAdministrativa, Long id, BindingResult validacao);

    void excluir(Long id);


    }
