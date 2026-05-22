package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Fatura;
import com.TixheDecor.backend.repository.FaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FaturaService {

    @Autowired
    private FaturaRepository faturaRepository;

    public List<Fatura> getAll() {
        return faturaRepository.findAll();
    }

    public Optional<Fatura> getById(Integer id) {
        return faturaRepository.findById(id);
    }

    public List<Fatura> getByProjekti(Integer projektiId) {
        return faturaRepository.findByProjektiProjektiId(projektiId);
    }

    public List<Fatura> getByKlienti(Integer klientiId) {
        return faturaRepository.findByKlientiKlientiId(klientiId);
    }

    public List<Fatura> getByStatusi(String statusi) {
        return faturaRepository.findByStatusi(statusi);
    }

    public Fatura create(Fatura fatura) {
        return faturaRepository.save(fatura);
    }

    public Optional<Fatura> update(Integer id, Fatura fatura) {
        if (!faturaRepository.existsById(id)) {
            return Optional.empty();
        }
        fatura.setFaturaId(id);
        return Optional.of(faturaRepository.save(fatura));
    }

    public boolean delete(Integer id) {
        if (!faturaRepository.existsById(id)) {
            return false;
        }
        faturaRepository.deleteById(id);
        return true;
    }
}
