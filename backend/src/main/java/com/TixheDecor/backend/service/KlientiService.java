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

    // Merr të gjithë klientët
    public List<Klienti> getAll() {
        return klientiRepository.findAll();
    }

    // Merr klientin me ID
    public Optional<Klienti> getById(Integer id) {
        return klientiRepository.findById(id);
    }

    // Krijo klient të ri
    public Klienti create(Klienti klienti) {
        return klientiRepository.save(klienti);
    }

    // Modifiko klientin
    public Klienti update(Integer id, Klienti klienti) {
        klienti.setKlientiId(id);
        return klientiRepository.save(klienti);
    }

    // Fshi klientin
    public void delete(Integer id) {
        klientiRepository.deleteById(id);
    }

    // Merr klientët sipas statusit
    public List<Klienti> getByStatusi(String statusi) {
        return klientiRepository.findByStatusi(statusi);
    }
}