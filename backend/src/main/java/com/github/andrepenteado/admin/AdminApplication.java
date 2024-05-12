package com.github.andrepenteado.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "com.github.andrepenteado.admin", "com.github.andrepenteado.core.web" })
public class AdminApplication {

    public static final String PERFIL_ADMINISTRADOR = "ROLE_com.github.andrepenteado.admin_ADMINISTRADOR";

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

}
