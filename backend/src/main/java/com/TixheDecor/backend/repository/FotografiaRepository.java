
package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Fotografia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FotografiaRepository extends JpaRepository<Fotografia, Integer> {
    List<Fotografia> findByProjektiProjektiId(Integer projektiId);
    List<Fotografia> findByLlojiIgnoreCase(String lloji);
}
