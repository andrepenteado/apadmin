package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.model.repositories.CargoRepository;
import com.github.andrepenteado.admin.services.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CargoServiceImpl implements CargoService {

    private final CargoRepository repository;

    @Override
    public List<Cargo> listar() {
        return null;
    }

    @Override
    public Optional<Cargo> buscar(Long id) {
        return Optional.empty();
    }

    @Override
    public Cargo incluir(Cargo cargo, BindingResult validacao) {
        return null;
    }

    @Override
    public Cargo alterar(Cargo cargo, Long id, BindingResult validacao) {
        return null;
    }

    @Override
    public void excluir(Long id) {

    }
}
