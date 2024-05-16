package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.services.CargoService;
import com.github.andrepenteado.admin.services.EmpresaService;
import io.micrometer.observation.annotation.Observed;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static com.github.andrepenteado.admin.AdminApplication.PERFIL_ADMINISTRADOR;

@RestController
@RequestMapping("/cargos")
@RequiredArgsConstructor
@Observed
@Slf4j
public class CargoResource {

    private final CargoService service;

    private final EmpresaService empresaService;

    @GetMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public List<Cargo> listar() {
        log.info("Listar todos cargos");
        return service.listar();
    }

    @GetMapping("/empresa/{idEmpresa}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public List<Cargo> listarPorEmpresa(@PathVariable Long idEmpresa) {
        log.info("Listar cargos por empresa de ID #{}", idEmpresa);
        return service.listarPorEmpresa(idEmpresa);
    }

    @GetMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Cargo buscar(@PathVariable Long id) {
        log.info("Buscar cargo por ID #{}", id);
        return service.buscar(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Cargo de ID #%n não encontrada", id)));
    }

    @PostMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public Cargo incluir(@Valid @RequestBody Cargo cargo, BindingResult validacao) {
        log.info("Incluir novo cargo {}", cargo);
        return service.incluir(cargo, validacao);
    }

    @PutMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Cargo alterar(@PathVariable Long id, @Valid @RequestBody Cargo cargo, BindingResult validacao) {
        log.info("Alterar cargo {}", cargo);
        return service.alterar(cargo, id, validacao);
    }

    @DeleteMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public void excluir(@PathVariable Long id) {
        log.info("Excluir cargo ID #{}", id);
        service.excluir(id);
    }

}
