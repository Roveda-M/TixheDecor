package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Integer> {
    List<StockMovement> findByMaterialiMaterialiId(Integer materialiId);
    List<StockMovement> findByTipi(String tipi);
}
