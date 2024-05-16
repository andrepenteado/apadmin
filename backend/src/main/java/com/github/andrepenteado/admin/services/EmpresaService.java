package com.github.andrepenteado.admin.services;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.core.web.dto.UserLogin;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

public interface EmpresaService {

    List<Empresa> listar();

    Optional<Empresa> buscar(Long id);

    Empresa incluir(Empresa empresa, UserLogin userLogin, BindingResult validacao);

    Empresa alterar(Empresa empresa, Long id, UserLogin userLogin, BindingResult validacao);

    void excluir(Long id);

}
