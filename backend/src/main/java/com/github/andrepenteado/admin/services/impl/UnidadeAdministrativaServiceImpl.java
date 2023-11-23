package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.UnidadeAdministrativa;
import com.github.andrepenteado.admin.model.repositories.UnidadeAdministrativaRepository;
import com.github.andrepenteado.admin.services.UnidadeAdministrativaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UnidadeAdministrativaServiceImpl implements UnidadeAdministrativaService {

    private final UnidadeAdministrativaRepository repository;

    @Override
    public List<UnidadeAdministrativa> listar() {
        return null;
    }

    @Override
    public Optional<UnidadeAdministrativa> buscar(Long id) {
        return Optional.empty();
    }

    @Override
    public UnidadeAdministrativa incluir(UnidadeAdministrativa unidadeAdministrativa, BindingResult validacao) {
        return null;
    }

    @Override
    public UnidadeAdministrativa alterar(UnidadeAdministrativa unidadeAdministrativa, Long id, BindingResult validacao) {
        return null;
    }

    @Override
    public void excluir(Long id) {

    }
}
