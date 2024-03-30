package com.github.andrepenteado.admin.model.repositories;

import com.github.andrepenteado.admin.model.entities.Cargo;
import com.github.andrepenteado.admin.model.entities.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {

    List<Cargo> findAllByOrderByNomeAsc();

    List<Cargo> findByEmpresa_Id(Long idEmpresa);

}
