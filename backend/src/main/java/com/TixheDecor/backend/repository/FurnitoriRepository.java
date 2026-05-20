package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Furnitori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FurnitoriRepository extends JpaRepository<Furnitori, Integer> {
    List<Furnitori> findByStatusi(String statusi);
}