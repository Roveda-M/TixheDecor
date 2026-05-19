package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetyrimiProjektitRepository extends JpaRepository<DetyrimiProjektit, Integer> {
    List<DetyrimiProjektit> findByProjektiProjektiId(Integer projektiId);
    List<DetyrimiProjektit> findByPunetoriPunetoriId(Integer punetoriId);
    List<DetyrimiProjektit> findByStatusi(String statusi);
}
