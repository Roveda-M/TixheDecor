package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Projekti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjektiRepository extends JpaRepository<Projekti, Integer> {
    List<Projekti> findByKlientiKlientiId(Integer klientiId);
    List<Projekti> findByStatusi(String statusi);
}