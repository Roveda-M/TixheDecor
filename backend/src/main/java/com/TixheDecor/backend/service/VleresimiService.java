package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Vleresimi;
import com.TixheDecor.backend.repository.VleresimiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VleresimiService {

    @Autowired
    private VleresimiRepository vleresimiRepository;

    public List<Vleresimi> getAll() {
        return vleresimiRepository.findAll();
    }

    public Optional<Vleresimi> getById(Integer id) {
        return vleresimiRepository.findById(id);
    }

    public List<Vleresimi> getByProjekti(Integer projektiId) {
        return vleresimiRepository.findByProjektiProjektiId(projektiId);
    }

    public List<Vleresimi> getByKlienti(Integer klientiId) {
        return vleresimiRepository.findByKlientiKlientiId(klientiId);
    }

    public Vleresimi create(Vleresimi vleresimi) {
        return vleresimiRepository.save(vleresimi);
    }

    public Optional<Vleresimi> update(Integer id, Vleresimi vleresimi) {
        if (!vleresimiRepository.existsById(id)) {
            return Optional.empty();
        }
        vleresimi.setVleresimiId(id);
        return Optional.of(vleresimiRepository.save(vleresimi));
    }

    public boolean delete(Integer id) {
        if (!vleresimiRepository.existsById(id)) {
            return false;
        }
        vleresimiRepository.deleteById(id);
        return true;
    }
}
