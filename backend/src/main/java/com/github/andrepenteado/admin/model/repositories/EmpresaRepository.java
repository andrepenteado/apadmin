package com.github.andrepenteado.admin.model.repositories;

import com.github.andrepenteado.admin.model.entities.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    List<Empresa> findAllByOOrderByRazaoSocialAsc();

}
