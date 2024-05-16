package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Colaborador;
import com.github.andrepenteado.admin.model.repositories.ColaboradorRepository;
import com.github.andrepenteado.admin.services.ColaboradorService;
import com.github.andrepenteado.core.common.CoreUtil;
import com.github.andrepenteado.core.web.dto.UserLogin;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ColaboradorServiceImpl implements ColaboradorService {

    private final ColaboradorRepository repository;

    @Override
    public List<Colaborador> listar() {
        return repository.findAllByOrderByNomeAsc();
    }

    @Override
    public Optional<Colaborador> buscar(Long id) {
        return repository.findById(id);
    }

    @Override
    public Colaborador incluir(Colaborador colaborador, UserLogin userLogin, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        if (Objects.nonNull(repository.findByCpf(colaborador.getCpf())))
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, String.format("CPF %n já se encontra cadastrado", colaborador.getCpf()));
        colaborador.setDataCadastro(LocalDateTime.now());
        colaborador.setUsuarioCadastro(userLogin.getNome());
        return repository.save(colaborador);
    }

    @Override
    public Colaborador alterar(Colaborador colaborador, Long id, UserLogin userLogin, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        Colaborador colaboradorAlterar = buscar(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Colaborador de ID #%n não encontrado", id)));
        BeanUtils.copyProperties(colaborador, colaboradorAlterar);
        if (!Objects.equals(colaboradorAlterar.getId(), id))
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("Solicitado alterar colaborador #ID %n, porém enviado dados do colaborador #%n", id, colaboradorAlterar.getId()));
        colaborador.setDataUltimaAtualizacao(LocalDateTime.now());
        colaborador.setUsuarioUltimaAtualizacao(userLogin.getNome());
        return repository.save(colaborador);
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
