package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Vleresimi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VleresimiRepository extends JpaRepository<Vleresimi, Integer> {
    List<Vleresimi> findByProjektiProjektiId(Integer projektiId);
    List<Vleresimi> findByKlientiKlientiId(Integer klientiId);
}