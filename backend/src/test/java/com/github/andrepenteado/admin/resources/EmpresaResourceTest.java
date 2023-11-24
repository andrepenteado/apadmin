package com.github.andrepenteado.admin.resources;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Testes do resource {@link EmpresaResource}
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestExecutionListeners({
    DependencyInjectionTestExecutionListener.class,
    TransactionalTestExecutionListener.class,
    DbUnitTestExecutionListener.class
})
@DatabaseSetup("/datasets/empresa.xml")
@Transactional
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class EmpresaResourceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private final String RAZAO_SOCIAL = "Empresa para Testes";

    private final Long CNPJ = 123456789000112L;

    private Empresa getEmpresa(Long id) {
        Empresa empresa = new Empresa();
        if (id != null)
            empresa.setId(id);
        empresa.setDataCadastro(LocalDateTime.now());
        empresa.setRazaoSocial(RAZAO_SOCIAL);
        empresa.setCnpj(CNPJ);
        empresa.setTelefone("123123123");
        return empresa;
    }

    private String getJsonEmpresa(Long id) throws Exception {
        return objectMapper.writeValueAsString(getEmpresa(id));
    }

    @Test
    @DisplayName("Listar todas empresas")
    void testListar() throws Exception {
        String json = mockMvc.perform(get("/empresas")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        List<Empresa> lista = objectMapper.readValue(json, new TypeReference<List<Empresa>>() {});
        assertEquals(lista.size(), 2);
    }

    @Test
    @DisplayName("Buscar empresa por ID")
    void testBuscar() throws Exception {
        mockMvc.perform(get("/empresas/100")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        mockMvc.perform(get("/empresas/999")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Incluir nova empresa")
    void testIncluir() throws Exception {
        String json = mockMvc.perform(post("/empresas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .content(getJsonEmpresa(-1L)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        Empresa empresaNovo = objectMapper.readValue(json, Empresa.class);
        assertEquals(empresaNovo.getRazaoSocial(), RAZAO_SOCIAL);
        assertNotNull(empresaNovo.getId());

        // Sem dados obrigatórios
        mockMvc.perform(post("/empresas")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new Empresa())))
            .andExpect(status().isUnprocessableEntity())
            .andExpect(ex -> assertTrue(ex.getResolvedException().getMessage().contains("é um campo obrigatório")));

        // CNPJ duplicado
        mockMvc.perform(post("/empresas")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(getJsonEmpresa(-1L)))
            .andExpect(status().isUnprocessableEntity())
            .andExpect(ex -> assertTrue(ex.getResolvedException().getMessage().contains("já se encontra cadastrado")));
    }

    @Test
    @DisplayName("Alterar empresa existente")
    void testAlterar() throws Exception {
        String json = mockMvc.perform(put("/empresas/100")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(getJsonEmpresa(100L)))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
        Empresa empresaAlterado = objectMapper.readValue(json, Empresa.class);
        assertEquals(empresaAlterado.getRazaoSocial(), RAZAO_SOCIAL);
        assertEquals(empresaAlterado.getId(), 100);

        mockMvc.perform(put("/empresas/999")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(getJsonEmpresa(100L)))
            .andExpect(status().isNotFound())
            .andExpect(ex -> assertTrue(ex.getResolvedException().getMessage().contains("não encontrado")));

        mockMvc.perform(put("/empresas/100")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(getJsonEmpresa(300L)))
            .andExpect(status().isConflict())
            .andExpect(ex -> assertTrue(ex.getResolvedException().getMessage().contains("porém enviado dados da empresa")));

        mockMvc.perform(put("/empresas/100")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(new Empresa())))
            .andExpect(status().isUnprocessableEntity())
            .andExpect(ex -> assertTrue(ex.getResolvedException().getMessage().contains("é um campo obrigatório")));
    }

    @Test
    @DisplayName("Excluir empresa existente")
    void testExcluir() throws Exception {
        mockMvc.perform(delete("/empresas/200")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }
}