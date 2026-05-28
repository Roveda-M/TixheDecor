package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Furnitori;
import com.TixheDecor.backend.repository.FurnitoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FurnitoriService {

    @Autowired
    private FurnitoriRepository furnitoriRepository;

    public List<Furnitori> getAll() {
        return furnitoriRepository.findAll();
    }

    public Optional<Furnitori> getById(Integer id) {
        return furnitoriRepository.findById(id);
    }

    public List<Furnitori> getByStatusi(String statusi) {
        return furnitoriRepository.findByStatusi(statusi);
    }

    public Furnitori create(Furnitori furnitori) {
        validate(furnitori);
        return furnitoriRepository.save(furnitori);
    }

    public Optional<Furnitori> update(Integer id, Furnitori furnitori) {
        if (!furnitoriRepository.existsById(id)) {
            return Optional.empty();
        }
        validate(furnitori);
        furnitori.setFurnitoriId(id);
        return Optional.of(furnitoriRepository.save(furnitori));
    }

    public boolean delete(Integer id) {
        if (!furnitoriRepository.existsById(id)) {
            return false;
        }
        furnitoriRepository.deleteById(id);
        return true;
    }

    private void validate(Furnitori furnitori) {
        if (furnitori == null) {
            throw new IllegalArgumentException("Furnitori nuk mund te jete bosh.");
        }
        if (isBlank(furnitori.getEmri())) {
            throw new IllegalArgumentException("Emri i furnitorit eshte i detyrueshem.");
        }
        if (isBlank(furnitori.getKontaktiKryesor())) {
            throw new IllegalArgumentException("Kontakti kryesor eshte i detyrueshem.");
        }
        if (isBlank(furnitori.getKushtetPageses())) {
            throw new IllegalArgumentException("Kushtet e pageses jane te detyrueshme.");
        }
        if (furnitori.getVleresimi() == null || furnitori.getVleresimi() < 1 || furnitori.getVleresimi() > 5) {
            throw new IllegalArgumentException("Vleresimi i furnitorit duhet te jete nga 1 deri ne 5.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
