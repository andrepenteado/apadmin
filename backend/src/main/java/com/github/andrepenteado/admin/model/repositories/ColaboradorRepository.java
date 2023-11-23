package com.github.andrepenteado.admin.model.repositories;

import com.github.andrepenteado.admin.model.entities.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {

    List<Colaborador> findAllByOOrderByNomeAsc();

}
