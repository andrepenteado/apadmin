package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.model.repositories.CargoRepository;
import com.github.andrepenteado.admin.services.CargoService;
import com.github.andrepenteado.core.common.CoreUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CargoServiceImpl implements CargoService {

    private final CargoRepository repository;

    @Override
    public List<Cargo> listar() {
        return repository.findAllByOrderByNomeAsc();
    }

    @Override
    public List<Cargo> listarPorEmpresa(Long idEmpresa) {
        return repository.findByEmpresa_Id(idEmpresa);
    }

    @Override
    public Optional<Cargo> buscar(Long id) {
        return repository.findById(id);
    }

    @Override
    public Cargo incluir(Cargo cargo, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        return repository.save(cargo);
    }

    @Override
    public Cargo alterar(Cargo cargo, Long id, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        Cargo cargoAlterar = buscar(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Cargo de ID #%n não encontrado", id)));
        BeanUtils.copyProperties(cargo, cargoAlterar);
        if (!Objects.equals(cargoAlterar.getId(), id))
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("Solicitado alterar cargo ID %n, porém enviado dados do cargo %n", id, cargoAlterar.getId()));
        return repository.save(cargo);
    }

    @Override
    public void excluir(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EmptyResultDataAccessException ex) {
            throw new ResponseStatusException((HttpStatus.NOT_FOUND));
        }
    }
}
