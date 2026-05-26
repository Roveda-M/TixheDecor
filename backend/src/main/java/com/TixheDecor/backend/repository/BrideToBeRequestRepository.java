package com.TixheDecor.backend.repository;

import com.TixheDecor.backend.model.BrideToBeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrideToBeRequestRepository extends JpaRepository<BrideToBeRequest, Integer> {
}
