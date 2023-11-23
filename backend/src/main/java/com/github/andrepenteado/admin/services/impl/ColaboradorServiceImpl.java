package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Colaborador;
import com.github.andrepenteado.admin.model.repositories.ColaboradorRepository;
import com.github.andrepenteado.admin.services.ColaboradorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColaboradorServiceImpl implements ColaboradorService {

    private final ColaboradorRepository repository;

    @Override
    public List<Colaborador> listar() {
        return null;
    }

    @Override
    public Optional<Colaborador> buscar(Long id) {
        return Optional.empty();
    }

    @Override
    public Colaborador incluir(Colaborador colaborador, BindingResult validacao) {
        return null;
    }

    @Override
    public Colaborador alterar(Colaborador colaborador, Long id, BindingResult validacao) {
        return null;
    }

    @Override
    public void excluir(Long id) {

    }
}
