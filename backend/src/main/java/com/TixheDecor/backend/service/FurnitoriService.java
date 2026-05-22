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
        return furnitoriRepository.save(furnitori);
    }

    public Optional<Furnitori> update(Integer id, Furnitori furnitori) {
        if (!furnitoriRepository.existsById(id)) {
            return Optional.empty();
        }
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
}
