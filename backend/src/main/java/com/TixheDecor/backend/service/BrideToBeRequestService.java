package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.BrideToBeRequest;
import com.TixheDecor.backend.repository.BrideToBeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrideToBeRequestService {

    @Autowired
    private BrideToBeRequestRepository brideToBeRequestRepository;

    public List<BrideToBeRequest> getAll() {
        return brideToBeRequestRepository.findAll();
    }

    public Optional<BrideToBeRequest> getById(Integer id) {
        return brideToBeRequestRepository.findById(id);
    }

    public BrideToBeRequest create(BrideToBeRequest request) {
        return brideToBeRequestRepository.save(request);
    }

    public Optional<BrideToBeRequest> update(Integer id, BrideToBeRequest request) {
        Optional<BrideToBeRequest> existing = brideToBeRequestRepository.findById(id);
        if (existing.isEmpty()) {
            return Optional.empty();
        }
        request.setRequestId(id);
        request.setCreatedAt(existing.get().getCreatedAt());
        if (request.getStatusi() == null || request.getStatusi().isBlank()) {
            request.setStatusi("I filluar");
        }
        return Optional.of(brideToBeRequestRepository.save(request));
    }

    public boolean delete(Integer id) {
        if (!brideToBeRequestRepository.existsById(id)) {
            return false;
        }
        brideToBeRequestRepository.deleteById(id);
        return true;
    }
}
