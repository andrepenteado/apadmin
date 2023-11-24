package com.github.andrepenteado.admin.services.impl;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.model.repositories.EmpresaRepository;
import com.github.andrepenteado.admin.services.EmpresaService;
import com.github.andrepenteado.core.common.CoreUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpresaServiceImpl implements EmpresaService {

    private final EmpresaRepository repository;

    @Override
    public List<Empresa> listar() {
        return repository.findAllByOrderByRazaoSocialAsc();
    }

    @Override
    public Optional<Empresa> buscar(Long id) {
        return repository.findById(id);
    }

    @Override
    public Empresa incluir(Empresa empresa, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        if (Objects.nonNull(repository.findByCnpj(empresa.getCnpj())))
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, String.format("CNPJ %n já se encontra cadastrado", empresa.getCnpj()));
        empresa.setDataCadastro(LocalDateTime.now());
        empresa.setUsuarioCadastro(SecurityContextHolder.getContext().getAuthentication().getName());
        return repository.save(empresa);
    }

    @Override
    public Empresa alterar(Empresa empresa, Long id, BindingResult validacao) {
        String erros = CoreUtil.validateModel(validacao);
        if (erros != null)
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, erros);
        Empresa empresaAlterar = buscar(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Empresa de ID %n não encontrada", id)));
        BeanUtils.copyProperties(empresa, empresaAlterar);
        if (!Objects.equals(empresaAlterar.getId(), id))
            throw new ResponseStatusException(HttpStatus.CONFLICT, String.format("Solicitado alterar empresa #ID %n, porém enviado dados da empresa #%n", id, empresaAlterar.getId()));
        empresa.setDataUltimaAtualizacao(LocalDateTime.now());
        empresa.setUsuarioUltimaAtualizacao(SecurityContextHolder.getContext().getAuthentication().getName());
        return repository.save(empresa);
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
