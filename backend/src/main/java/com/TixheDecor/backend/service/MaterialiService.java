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
        validate(materiali);
        return materialiRepository.save(materiali);
    }

    public Optional<Materiali> update(Integer id, Materiali materiali) {
        if (!materialiRepository.existsById(id)) {
            return Optional.empty();
        }
        validate(materiali);
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

    private void validate(Materiali materiali) {
        if (materiali == null) {
            throw new IllegalArgumentException("Materiali nuk mund te jete bosh.");
        }
        if (isBlank(materiali.getEmri())) {
            throw new IllegalArgumentException("Emri i materialit eshte i detyrueshem.");
        }
        if (isBlank(materiali.getNjesiaMatese())) {
            throw new IllegalArgumentException("Njesia matese eshte e detyrueshme.");
        }
        if (isBlank(materiali.getKategoria())) {
            throw new IllegalArgumentException("Kategoria eshte e detyrueshme.");
        }
        if (materiali.getCmimiPerNjesi() == null || materiali.getCmimiPerNjesi().signum() < 0) {
            throw new IllegalArgumentException("Cmimi per njesi duhet te jete zero ose pozitiv.");
        }
        if (materiali.getSasiaStokut() == null || materiali.getSasiaStokut() < 0) {
            throw new IllegalArgumentException("Sasia ne stok duhet te jete zero ose pozitive.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
