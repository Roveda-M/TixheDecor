package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Fotografia;
import com.TixheDecor.backend.repository.FotografiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FotografiaService {

    @Autowired
    private FotografiaRepository fotografiaRepository;

    public List<Fotografia> getAll() {
        return fotografiaRepository.findAll();
    }

    public Optional<Fotografia> getById(Integer id) {
        return fotografiaRepository.findById(id);
    }

    public List<Fotografia> getByProjekti(Integer projektiId) {
        return fotografiaRepository.findByProjektiProjektiId(projektiId);
    }

    public List<Fotografia> getByLloji(String lloji) {
        return fotografiaRepository.findByLloji(lloji);
    }

    public Fotografia create(Fotografia fotografia) {
        return fotografiaRepository.save(fotografia);
    }

    public Optional<Fotografia> update(Integer id, Fotografia fotografia) {
        if (!fotografiaRepository.existsById(id)) {
            return Optional.empty();
        }
        fotografia.setFotografiaId(id);
        return Optional.of(fotografiaRepository.save(fotografia));
    }

    public boolean delete(Integer id) {
        if (!fotografiaRepository.existsById(id)) {
            return false;
        }
        fotografiaRepository.deleteById(id);
        return true;
    }
}
