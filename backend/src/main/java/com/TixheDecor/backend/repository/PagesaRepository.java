package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Pagesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PagesaRepository extends JpaRepository<Pagesa, Integer> {
    List<Pagesa> findByFaturaFaturaId(Integer faturaId);
    List<Pagesa> findByStatusi(String statusi);
}
