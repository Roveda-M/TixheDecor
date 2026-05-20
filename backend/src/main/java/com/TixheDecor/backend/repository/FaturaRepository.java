package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Fatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FaturaRepository extends JpaRepository<Fatura, Integer> {
    List<Fatura> findByProjektiProjektiId(Integer projektiId);
    List<Fatura> findByKlientiKlientiId(Integer klientiId);
    List<Fatura> findByStatusi(String statusi);
}
