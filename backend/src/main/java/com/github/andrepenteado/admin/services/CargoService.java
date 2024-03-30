package com.github.andrepenteado.admin.services;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.model.entities.Empresa;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface CargoService {

    List<Cargo> listar();

    List<Cargo> listarPorEmpresa(Long idEmpresa);

    Optional<Cargo> buscar(Long id);

    Cargo incluir(Cargo cargo, BindingResult validacao);

    Cargo alterar(Cargo cargo, Long id, BindingResult validacao);

    void excluir(Long id);

}
