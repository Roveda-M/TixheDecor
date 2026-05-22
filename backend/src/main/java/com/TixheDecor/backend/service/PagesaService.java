package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Pagesa;
import com.TixheDecor.backend.repository.PagesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagesaService {

    @Autowired
    private PagesaRepository pagesaRepository;

    public List<Pagesa> getAll() {
        return pagesaRepository.findAll();
    }

    public Optional<Pagesa> getById(Integer id) {
        return pagesaRepository.findById(id);
    }

    public List<Pagesa> getByFatura(Integer faturaId) {
        return pagesaRepository.findByFaturaFaturaId(faturaId);
    }

    public List<Pagesa> getByStatusi(String statusi) {
        return pagesaRepository.findByStatusi(statusi);
    }

    public Pagesa create(Pagesa pagesa) {
        return pagesaRepository.save(pagesa);
    }

    public Optional<Pagesa> update(Integer id, Pagesa pagesa) {
        if (!pagesaRepository.existsById(id)) {
            return Optional.empty();
        }
        pagesa.setPagesaId(id);
        return Optional.of(pagesaRepository.save(pagesa));
    }

    public boolean delete(Integer id) {
        if (!pagesaRepository.existsById(id)) {
            return false;
        }
        pagesaRepository.deleteById(id);
        return true;
    }
}
