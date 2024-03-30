package com.github.andrepenteado.admin.model.repositories;

import com.github.andrepenteado.admin.model.entities.Empresa;
import com.github.andrepenteado.admin.model.entities.UnidadeAdministrativa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnidadeAdministrativaRepository extends JpaRepository<UnidadeAdministrativa, Long> {

    List<UnidadeAdministrativa> findAllByOrderByNomeAsc();

    List<UnidadeAdministrativa> findByEmpresa_Id(Long idEmpresa);

}
