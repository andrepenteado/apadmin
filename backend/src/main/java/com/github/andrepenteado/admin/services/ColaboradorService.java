package com.github.andrepenteado.admin.services;

import com.github.andrepenteado.admin.model.entities.Colaborador;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface ColaboradorService {

    List<Colaborador> listar();

    Optional<Colaborador> buscar(Long id);

    Colaborador incluir(Colaborador colaborador, BindingResult validacao);

    Colaborador alterar(Colaborador colaborador, Long id, BindingResult validacao);

    void excluir(Long id);

}
