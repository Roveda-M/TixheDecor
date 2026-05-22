package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import com.TixheDecor.backend.repository.DetyrimiProjektitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetyrimiProjektitService {

    @Autowired
    private DetyrimiProjektitRepository detyrimiProjektitRepository;

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

    public List<DetyrimiProjektit> getByStatusi(String statusi) {
        return detyrimiProjektitRepository.findByStatusi(statusi);
    }

    public DetyrimiProjektit create(DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitRepository.save(detyrimiProjektit);
    }

    public Optional<DetyrimiProjektit> update(Integer id, DetyrimiProjektit detyrimiProjektit) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return Optional.empty();
        }
        detyrimiProjektit.setDetyrimiId(id);
        return Optional.of(detyrimiProjektitRepository.save(detyrimiProjektit));
    }

    public boolean delete(Integer id) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return false;
        }
        detyrimiProjektitRepository.deleteById(id);
        return true;
    }
}
