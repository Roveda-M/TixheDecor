package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.MaterialiProjektit;
import com.TixheDecor.backend.repository.MaterialiProjektitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialiProjektitService {

    @Autowired
    private MaterialiProjektitRepository materialiProjektitRepository;

    public List<MaterialiProjektit> getAll() {
        return materialiProjektitRepository.findAll();
    }

    public Optional<MaterialiProjektit> getById(Integer id) {
        return materialiProjektitRepository.findById(id);
    }

    public List<MaterialiProjektit> getByProjekti(Integer projektiId) {
        return materialiProjektitRepository.findByProjektiProjektiId(projektiId);
    }

    public List<MaterialiProjektit> getByMateriali(Integer materialiId) {
        return materialiProjektitRepository.findBymaterialiMaterialiId(materialiId);
    }

    public MaterialiProjektit create(MaterialiProjektit materialiProjektit) {
        return materialiProjektitRepository.save(materialiProjektit);
    }

    public Optional<MaterialiProjektit> update(Integer id, MaterialiProjektit materialiProjektit) {
        if (!materialiProjektitRepository.existsById(id)) {
            return Optional.empty();
        }
        materialiProjektit.setMpId(id);
        return Optional.of(materialiProjektitRepository.save(materialiProjektit));
    }

    public boolean delete(Integer id) {
        if (!materialiProjektitRepository.existsById(id)) {
            return false;
        }
        materialiProjektitRepository.deleteById(id);
        return true;
    }
}
