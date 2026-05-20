package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Materiali;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaterialiRepository extends JpaRepository<Materiali, Integer> {
    List<Materiali> findByKategoria(String kategoria);
    List<Materiali> findByFurnitoriFurnitoriId(Integer furnitoriId);
}