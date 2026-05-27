package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.repository.BrideToBeRequestRepository;
import com.TixheDecor.backend.repository.DetyrimiProjektitRepository;
import com.TixheDecor.backend.repository.PunetoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetyrimiProjektitService {

    @Autowired
    private DetyrimiProjektitRepository detyrimiProjektitRepository;

    @Autowired
    private PunetoriRepository punetoriRepository;

    @Autowired
    private BrideToBeRequestRepository brideToBeRequestRepository;

    public List<DetyrimiProjektit> getAll() {
        return detyrimiProjektitRepository.findAll();
    }

    public Optional<DetyrimiProjektit> getById(Integer id) {
        return detyrimiProjektitRepository.findById(id);
    }

    public List<DetyrimiProjektit> getByProjekti(Integer projektiId) {
        return detyrimiProjektitRepository.findByProjektiProjektiId(projektiId);
    }

    public List<DetyrimiProjektit> getByPunetori(Integer punetoriId) {
        return detyrimiProjektitRepository.findByPunetoriPunetoriId(punetoriId);
    }

    public List<DetyrimiProjektit> getByPunetoriEmail(String email) {
        Punetori punetori = punetoriRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Punetori nuk u gjet per kete user."));
        return detyrimiProjektitRepository.findByPunetoriPunetoriId(punetori.getPunetoriId());
    }

    public List<DetyrimiProjektit> getByStatusi(String statusi) {
        return detyrimiProjektitRepository.findByStatusi(statusi);
    }

    public DetyrimiProjektit create(DetyrimiProjektit detyrimiProjektit) {
        resolvePunetori(detyrimiProjektit);
        resolveBrideToBeRequest(detyrimiProjektit);
        return detyrimiProjektitRepository.save(detyrimiProjektit);
    }

    public Optional<DetyrimiProjektit> update(Integer id, DetyrimiProjektit detyrimiProjektit) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return Optional.empty();
        }
        resolvePunetori(detyrimiProjektit);
        resolveBrideToBeRequest(detyrimiProjektit);
        detyrimiProjektit.setDetyrimiId(id);
        return Optional.of(detyrimiProjektitRepository.save(detyrimiProjektit));
    }

    public Optional<DetyrimiProjektit> updateStatusForPunetori(String email, Integer id, String statusi) {
        if (!isValidStatus(statusi)) {
            throw new IllegalArgumentException("Statusi nuk eshte valid.");
        }

        Punetori punetori = punetoriRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Punetori nuk u gjet per kete user."));

        return detyrimiProjektitRepository.findById(id)
                .filter(task -> task.getPunetori() != null
                        && task.getPunetori().getPunetoriId().equals(punetori.getPunetoriId()))
                .map(task -> {
                    task.setStatusi(statusi);
                    return detyrimiProjektitRepository.save(task);
                });
    }

    public boolean delete(Integer id) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return false;
        }
        detyrimiProjektitRepository.deleteById(id);
        return true;
    }

    private boolean isValidStatus(String statusi) {
        return "I filluar".equals(statusi)
                || "Ne proces".equals(statusi)
                || "I perfunduar".equals(statusi);
    }

    private void resolvePunetori(DetyrimiProjektit detyrimiProjektit) {
        if (detyrimiProjektit.getPunetori() == null) {
            return;
        }
        Punetori requestPunetori = detyrimiProjektit.getPunetori();
        if (requestPunetori.getPunetoriId() != null) {
            return;
        }
        if (requestPunetori.getEmail() != null && !requestPunetori.getEmail().isBlank()) {
            Punetori punetori = punetoriRepository.findByEmailIgnoreCase(requestPunetori.getEmail().trim())
                    .orElseThrow(() -> new RuntimeException("Punetori nuk u gjet."));
            detyrimiProjektit.setPunetori(punetori);
            return;
        }
        String requestedName = ((requestPunetori.getEmri() == null ? "" : requestPunetori.getEmri()) + " "
                + (requestPunetori.getMbiemri() == null ? "" : requestPunetori.getMbiemri())).trim();
        if (!requestedName.isBlank()) {
            Punetori punetori = punetoriRepository.findAll().stream()
                    .filter(item -> requestedName.equalsIgnoreCase(((item.getEmri() == null ? "" : item.getEmri()) + " "
                            + (item.getMbiemri() == null ? "" : item.getMbiemri())).trim()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Punetori nuk u gjet."));
            detyrimiProjektit.setPunetori(punetori);
        }
    }

    private void resolveBrideToBeRequest(DetyrimiProjektit detyrimiProjektit) {
        if (detyrimiProjektit.getBrideToBeRequest() == null
                || detyrimiProjektit.getBrideToBeRequest().getRequestId() == null) {
            detyrimiProjektit.setBrideToBeRequest(null);
            detyrimiProjektit.setIncludeClientImages(false);
            return;
        }

        detyrimiProjektit.setBrideToBeRequest(
                brideToBeRequestRepository.findById(detyrimiProjektit.getBrideToBeRequest().getRequestId())
                        .orElseThrow(() -> new RuntimeException("BrideToBe request nuk u gjet."))
        );
        if (detyrimiProjektit.getIncludeClientImages() == null) {
            detyrimiProjektit.setIncludeClientImages(true);
        }
    }
}
