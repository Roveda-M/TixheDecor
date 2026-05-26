package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.BrideToBeRequest;
import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.repository.BrideToBeRequestRepository;
import com.TixheDecor.backend.repository.PunetoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrideToBeRequestService {

    @Autowired
    private BrideToBeRequestRepository brideToBeRequestRepository;

    @Autowired
    private PunetoriRepository punetoriRepository;

    public List<BrideToBeRequest> getAll() {
        return brideToBeRequestRepository.findAll();
    }

    public BrideToBeRequest create(BrideToBeRequest request) {
        request.setRequestId(null);
        request.setStatusi("PENDING");
        request.setPunetori(null);
        return brideToBeRequestRepository.save(request);
    }

    public Optional<BrideToBeRequest> update(Integer id, BrideToBeRequest request) {
        return brideToBeRequestRepository.findById(id).map(existing -> {
            existing.setBrideName(request.getBrideName());
            existing.setEventDate(request.getEventDate());
            existing.setEventTime(request.getEventTime());
            existing.setLocation(request.getLocation());
            existing.setSelectedDecors(request.getSelectedDecors());
            existing.setStatusi(request.getStatusi());

            if (request.getPunetori() != null && request.getPunetori().getPunetoriId() != null) {
                Punetori punetori = punetoriRepository.findById(request.getPunetori().getPunetoriId())
                        .orElseThrow(() -> new IllegalArgumentException("Punetori nuk ekziston."));
                existing.setPunetori(punetori);
                if (existing.getStatusi() == null || existing.getStatusi().isBlank() || "PENDING".equals(existing.getStatusi())) {
                    existing.setStatusi("ASSIGNED");
                }
            } else {
                existing.setPunetori(null);
            }

            return brideToBeRequestRepository.save(existing);
        });
    }

    public boolean delete(Integer id) {
        if (!brideToBeRequestRepository.existsById(id)) {
            return false;
        }
        brideToBeRequestRepository.deleteById(id);
        return true;
    }
}
