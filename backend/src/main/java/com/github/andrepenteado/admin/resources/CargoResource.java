package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.services.CargoService;
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
@RequestMapping("/cargos")
@RequiredArgsConstructor
@Observed
@Slf4j
public class CargoResource {

    private final CargoService service;

    @GetMapping
    public List<Cargo> listar() {
        log.info("Listar todos cargos");
        try {
            return service.listar();
        }
        catch (Exception ex) {
            log.error("Erro no processamento", ex);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro no processamento");
        }
    }

    @GetMapping("/{id}")
    public Cargo buscar(@PathVariable Long id) {
        log.info("Buscar cargo por ID #{}", id);
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
    public Cargo incluir(@Valid @RequestBody Cargo cargo, BindingResult validacao) {
        log.info("Incluir novo cargo {}", cargo);
        try {
            return service.incluir(cargo, validacao);
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
    public Cargo alterar(@PathVariable Long id, @Valid @RequestBody Cargo cargo, BindingResult validacao) {
        log.info("Alterar cargo {}", cargo);
        try {
            return service.alterar(cargo, id, validacao);
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
        log.info("Excluir cargo ID #{}", id);
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
