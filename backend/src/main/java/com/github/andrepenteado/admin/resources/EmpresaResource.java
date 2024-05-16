package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.services.EmpresaService;
import com.github.andrepenteado.core.web.dto.UserLogin;
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
@RequestMapping("/empresas")
@RequiredArgsConstructor
@Observed
@Slf4j
public class EmpresaResource {

    private final EmpresaService service;

    @GetMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public List<Empresa> listar() {
        log.info("Listar todas empresas");
        return service.listar();
    }

    @GetMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Empresa buscar(@PathVariable Long id) {
        log.info("Buscar empresa por ID #{}", id);
        return service.buscar(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Empresa de ID #%n não encontrada", id)));
    }

    @PostMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public Empresa incluir(@Valid @RequestBody Empresa empresa, UserLogin userLogin, BindingResult validacao) {
        log.info("Incluir nova empresa {}", empresa);
        return service.incluir(empresa, userLogin, validacao);
    }

    @PutMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Empresa alterar(@PathVariable Long id, @Valid @RequestBody Empresa empresa, UserLogin userLogin, BindingResult validacao) {
        log.info("Alterar empresa {}", empresa);
        return service.alterar(empresa, id, userLogin, validacao);
    }

    @DeleteMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public void excluir(@PathVariable Long id) {
        log.info("Excluir empresa ID #{}", id);
        service.excluir(id);
    }

}
