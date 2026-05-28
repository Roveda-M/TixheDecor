package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.MaterialiProjektit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaterialiProjektitRepository extends JpaRepository<MaterialiProjektit, Integer> {
    List<MaterialiProjektit> findByProjektiProjektiId(Integer projektiId);
    List<MaterialiProjektit> findByMaterialiMaterialiId(Integer materialiId);
}
