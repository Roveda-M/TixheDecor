package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Projekti;
import com.TixheDecor.backend.repository.ProjektiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjektiService {

    @Autowired
    private ProjektiRepository projektiRepository;

    public List<Projekti> getAll() {
        return projektiRepository.findAll();
    }

    public Optional<Projekti> getById(Integer id) {
        return projektiRepository.findById(id);
    }

    public List<Projekti> getByKlienti(Integer klientiId) {
        return projektiRepository.findByKlientiKlientiId(klientiId);
    }

    public List<Projekti> getByStatusi(String statusi) {
        return projektiRepository.findByStatusi(statusi);
    }

    public Projekti create(Projekti projekti) {
        return projektiRepository.save(projekti);
    }

    public Optional<Projekti> update(Integer id, Projekti projekti) {
        if (!projektiRepository.existsById(id)) {
            return Optional.empty();
        }
        projekti.setProjektiId(id);
        return Optional.of(projektiRepository.save(projekti));
    }

    public boolean delete(Integer id) {
        if (!projektiRepository.existsById(id)) {
            return false;
        }
        projektiRepository.deleteById(id);
        return true;
    }
}
