package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Klienti;
import com.TixheDecor.backend.repository.KlientiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KlientiService {

    @Autowired
    private KlientiRepository klientiRepository;

    public List<Klienti> getAll() {
        return klientiRepository.findAll();
    }

    public Optional<Klienti> getById(Integer id) {
        return klientiRepository.findById(id);
    }

    public Klienti create(Klienti klienti) {
        return klientiRepository.save(klienti);
    }

    public Optional<Klienti> update(Integer id, Klienti klienti) {
        if (!klientiRepository.existsById(id)) {
            return Optional.empty();
        }
        klienti.setKlientiId(id);
        return Optional.of(klientiRepository.save(klienti));
    }

    public boolean delete(Integer id) {
        if (!klientiRepository.existsById(id)) {
            return false;
        }
        klientiRepository.deleteById(id);
        return true;
    }

    public List<Klienti> getByStatusi(String statusi) {
        return klientiRepository.findByStatusi(statusi);
    }
}
