package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.UnidadeAdministrativa;
import com.github.andrepenteado.admin.services.UnidadeAdministrativaService;
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
@RequestMapping("/unidades-administrativas")
@RequiredArgsConstructor
@Observed
@Slf4j
public class UnidadeAdministrativaResource {

    private final UnidadeAdministrativaService service;

    @GetMapping
    public List<UnidadeAdministrativa> listar() {
        log.info("Listar todas unidades administrativas");
        try {
            return service.listar();
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @GetMapping("/{id}")
    public UnidadeAdministrativa buscar(@PathVariable Long id) {
        log.info("Buscar unidade administrativa por ID #{}", id);
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
    public UnidadeAdministrativa incluir(@Valid @RequestBody UnidadeAdministrativa unidadeAdministrativa, BindingResult validacao) {
        log.info("Incluir nova unidade administrativa {}", unidadeAdministrativa);
        try {
            return service.incluir(unidadeAdministrativa, validacao);
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
    public UnidadeAdministrativa alterar(@PathVariable Long id, @Valid @RequestBody UnidadeAdministrativa unidadeAdministrativa, BindingResult validacao) {
        log.info("Alterar unidade administrativa {}", unidadeAdministrativa);
        try {
            return service.alterar(unidadeAdministrativa, id, validacao);
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
        log.info("Excluir unidade administrativa ID #{}", id);
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
