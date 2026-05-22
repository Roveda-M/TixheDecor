package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Materiali;
import com.TixheDecor.backend.repository.MaterialiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialiService {

    @Autowired
    private MaterialiRepository materialiRepository;

    public List<Materiali> getAll() {
        return materialiRepository.findAll();
    }

    public Optional<Materiali> getById(Integer id) {
        return materialiRepository.findById(id);
    }

    public List<Materiali> getByKategoria(String kategoria) {
        return materialiRepository.findByKategoria(kategoria);
    }

    public List<Materiali> getByFurnitori(Integer furnitoriId) {
        return materialiRepository.findByFurnitoriFurnitoriId(furnitoriId);
    }

    public Materiali create(Materiali materiali) {
        return materialiRepository.save(materiali);
    }

    public Optional<Materiali> update(Integer id, Materiali materiali) {
        if (!materialiRepository.existsById(id)) {
            return Optional.empty();
        }
        materiali.setMaterialiId(id);
        return Optional.of(materialiRepository.save(materiali));
    }

    public boolean delete(Integer id) {
        if (!materialiRepository.existsById(id)) {
            return false;
        }
        materialiRepository.deleteById(id);
        return true;
    }
}
