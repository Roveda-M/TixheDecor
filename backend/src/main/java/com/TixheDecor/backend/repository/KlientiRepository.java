package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.Klienti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface KlientiRepository extends JpaRepository<Klienti, Integer> {
    Optional<Klienti> findByEmail(String email);

    Optional<Klienti> findFirstByEmriIgnoreCase(String emri);

    List<Klienti> findByStatusi(String statusi);
}