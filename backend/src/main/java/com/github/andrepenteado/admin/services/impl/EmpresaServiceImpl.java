package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.model.repositories.EmpresaRepository;
import com.github.andrepenteado.admin.services.EmpresaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpresaServiceImpl implements EmpresaService {

    private final EmpresaRepository repository;

    @Override
    public List<Empresa> listar() {
        return null;
    }

    @Override
    public Optional<Empresa> buscar(Long id) {
        return Optional.empty();
    }

    @Override
    public Empresa incluir(Empresa empresa, BindingResult validacao) {
        return null;
    }

    @Override
    public Empresa alterar(Empresa empresa, Long id, BindingResult validacao) {
        return null;
    }

    @Override
    public void excluir(Long id) {

    }
}
