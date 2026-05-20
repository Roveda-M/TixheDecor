package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Punetori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PunetoriRepository extends JpaRepository<Punetori, Integer> {
    Optional<Punetori> findByEmail(String email);
    List<Punetori> findByStatusi(String statusi);
}
