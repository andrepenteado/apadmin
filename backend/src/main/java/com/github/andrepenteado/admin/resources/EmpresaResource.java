package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.services.EmpresaService;
import io.micrometer.observation.annotation.Observed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/empresas")
@RequiredArgsConstructor
@Observed
@Slf4j
public class EmpresaResource {

    private final EmpresaService service;

    @GetMapping
    public List<Empresa> listar() {
        log.info("Listar todas empresas");
        try {
            return service.listar();
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @GetMapping("/{id}")
    public Empresa buscar(@PathVariable Long id) {
        log.info("Buscar empresa por ID #{}", id);
        try {
            return service.buscar(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Empresa de ID #%n não encontrada", id)));
        }
        catch (ResponseStatusException rsex) {
            throw rsex;
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @PostMapping
    public Empresa incluir(@Valid @RequestBody Empresa empresa, BindingResult validacao) {
        log.info("Incluir nova empresa {}", empresa);
        try {
            return service.incluir(empresa, validacao);
        }
        catch (ResponseStatusException rsex) {
            throw rsex;
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @PutMapping("/{id}")
    public Empresa alterar(@PathVariable Long id, @Valid @RequestBody Empresa empresa, BindingResult validacao) {
        log.info("Alterar empresa {}", empresa);
        try {
            return service.alterar(empresa, id, validacao);
        }
        catch (ResponseStatusException rsex) {
            throw rsex;
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        log.info("Excluir empresa ID #{}", id);
        try {
            service.excluir(id);
        }
        catch (ResponseStatusException rsex) {
            throw rsex;
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

}
