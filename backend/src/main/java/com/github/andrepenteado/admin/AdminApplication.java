package com.github.andrepenteado.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@SpringBootApplication(scanBasePackages = { "com.github.andrepenteado.admin", "com.github.andrepenteado.core.web" })
public class AdminApplication {

    public static final String PERFIL_ADMINISTRADOR = "ROLE_com.github.andrepenteado.admin_ADMINISTRADOR";

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

}
