package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Materiali;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialiRepository extends JpaRepository<Materiali, Integer> {
    List<Materiali> findByKategoria(String kategoria);
    List<Materiali> findByFurnitoriFurnitoriId(Integer furnitoriId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Materiali> findWithLockingByMaterialiId(Integer materialiId);
}
