package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Fatura;
import com.TixheDecor.backend.repository.FaturaRepository;
import com.TixheDecor.backend.repository.KlientiRepository;
import com.TixheDecor.backend.repository.ProjektiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FaturaService {

    @Autowired
    private FaturaRepository faturaRepository;

    @Autowired
    private KlientiRepository klientiRepository;

    @Autowired
    private ProjektiRepository projektiRepository;

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
        resolveRelations(fatura);
        return faturaRepository.save(fatura);
    }

    public Optional<Fatura> update(Integer id, Fatura fatura) {
        if (!faturaRepository.existsById(id)) {
            return Optional.empty();
        }
        fatura.setFaturaId(id);
        resolveRelations(fatura);
        return Optional.of(faturaRepository.save(fatura));
    }

    public boolean delete(Integer id) {
        if (!faturaRepository.existsById(id)) {
            return false;
        }
        faturaRepository.deleteById(id);
        return true;
    }

    private void resolveRelations(Fatura fatura) {
        if (fatura.getKlienti() != null && fatura.getKlienti().getKlientiId() != null) {
            fatura.setKlienti(
                    klientiRepository.findById(fatura.getKlienti().getKlientiId())
                            .orElseThrow(() -> new IllegalArgumentException("Klienti nuk u gjet."))
            );
        }
        if (fatura.getProjekti() != null && fatura.getProjekti().getProjektiId() != null) {
            fatura.setProjekti(
                    projektiRepository.findById(fatura.getProjekti().getProjektiId())
                            .orElseThrow(() -> new IllegalArgumentException("Projekti nuk u gjet."))
            );
        }
    }
}
