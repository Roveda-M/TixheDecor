package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.repository.PunetoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PunetoriService {

    @Autowired
    private PunetoriRepository punetoriRepository;

    public List<Punetori> getAll() {
        return punetoriRepository.findAll();
    }

    public Optional<Punetori> getById(Integer id) {
        return punetoriRepository.findById(id);
    }

    public List<Punetori> getByStatusi(String statusi) {
        return punetoriRepository.findByStatusi(statusi);
    }

    public Punetori create(Punetori punetori) {
        return punetoriRepository.save(punetori);
    }

    public Optional<Punetori> update(Integer id, Punetori punetori) {
        if (!punetoriRepository.existsById(id)) {
            return Optional.empty();
        }
        punetori.setPunetoriId(id);
        return Optional.of(punetoriRepository.save(punetori));
    }

    public boolean delete(Integer id) {
        if (!punetoriRepository.existsById(id)) {
            return false;
        }
        punetoriRepository.deleteById(id);
        return true;
    }
}
