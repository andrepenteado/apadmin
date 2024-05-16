package com.github.andrepenteado.admin.resources;

import com.github.andrepenteado.admin.model.entities.Colaborador;
import com.github.andrepenteado.admin.services.ColaboradorService;
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
@RequestMapping("/colaboradores")
@RequiredArgsConstructor
@Observed
@Slf4j
public class ColaboradorResource {

    private final ColaboradorService service;

    @GetMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public List<Colaborador> listar() {
        log.info("Listar todos colaboradores");
        return service.listar();
    }

    @GetMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Colaborador buscar(@PathVariable Long id) {
        log.info("Buscar colaborador por ID #{}", id);
        return service.buscar(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Empresa de ID #%n não encontrada", id)));
    }

    @PostMapping
    @Secured({ PERFIL_ADMINISTRADOR })
    public Colaborador incluir(@Valid @RequestBody Colaborador colaborador, UserLogin userLogin, BindingResult validacao) {
        log.info("Incluir novo colaborador {}", colaborador);
        return service.incluir(colaborador, userLogin, validacao);
    }

    @PutMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public Colaborador alterar(@PathVariable Long id, @Valid @RequestBody Colaborador colaborador, UserLogin userLogin, BindingResult validacao) {
        log.info("Alterar colaborador {}", colaborador);
        return service.alterar(colaborador, id, userLogin, validacao);
    }

    @DeleteMapping("/{id}")
    @Secured({ PERFIL_ADMINISTRADOR })
    public void excluir(@PathVariable Long id) {
        log.info("Excluir colaborador ID #{}", id);
        service.excluir(id);
    }

}
