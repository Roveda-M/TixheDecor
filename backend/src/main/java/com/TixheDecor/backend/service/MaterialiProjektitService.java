package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.MaterialiProjektit;
import com.TixheDecor.backend.model.Materiali;
import com.TixheDecor.backend.model.StockMovement;
import com.TixheDecor.backend.repository.MaterialiRepository;
import com.TixheDecor.backend.repository.MaterialiProjektitRepository;
import com.TixheDecor.backend.repository.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MaterialiProjektitService {

    @Autowired
    private MaterialiProjektitRepository materialiProjektitRepository;

    @Autowired
    private MaterialiRepository materialiRepository;

    @Autowired
    private StockMovementRepository stockMovementRepository;

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
        return materialiProjektitRepository.findByMaterialiMaterialiId(materialiId);
    }

    @Transactional
    public MaterialiProjektit create(MaterialiProjektit materialiProjektit) {
        validate(materialiProjektit);
        Materiali materiali = materialiRepository.findWithLockingByMaterialiId(
                        materialiProjektit.getMateriali().getMaterialiId())
                .orElseThrow(() -> new IllegalArgumentException("Materiali nuk u gjet."));

        int sasia = materialiProjektit.getSasia();
        int sasiaAktuale = materiali.getSasiaStokut() == null ? 0 : materiali.getSasiaStokut();
        if (sasiaAktuale < sasia) {
            throw new IllegalArgumentException("Stoku nuk mjafton per kete material.");
        }

        materiali.setSasiaStokut(sasiaAktuale - sasia);
        materialiProjektit.setMateriali(materiali);
        materialeCost(materialiProjektit, materiali);
        MaterialiProjektit saved = materialiProjektitRepository.save(materialiProjektit);
        stockMovementRepository.save(createUsageMovement(saved, materiali, sasia));
        return saved;
    }

    @Transactional
    public Optional<MaterialiProjektit> update(Integer id, MaterialiProjektit materialiProjektit) {
        Optional<MaterialiProjektit> existingOptional = materialiProjektitRepository.findById(id);
        if (existingOptional.isEmpty()) {
            return Optional.empty();
        }
        validate(materialiProjektit);
        MaterialiProjektit existing = existingOptional.get();
        Integer oldMaterialId = existing.getMateriali().getMaterialiId();
        Integer newMaterialId = materialiProjektit.getMateriali().getMaterialiId();
        int oldQuantity = existing.getSasia() == null ? 0 : existing.getSasia();
        int newQuantity = materialiProjektit.getSasia();

        if (oldMaterialId.equals(newMaterialId)) {
            Materiali materiali = materialiRepository.findWithLockingByMaterialiId(newMaterialId)
                    .orElseThrow(() -> new IllegalArgumentException("Materiali nuk u gjet."));
            int delta = newQuantity - oldQuantity;
            if (delta > 0 && (materiali.getSasiaStokut() == null || materiali.getSasiaStokut() < delta)) {
                throw new IllegalArgumentException("Stoku nuk mjafton per kete material.");
            }
            materiali.setSasiaStokut((materiali.getSasiaStokut() == null ? 0 : materiali.getSasiaStokut()) - delta);
            materialiProjektit.setMateriali(materiali);
            materialeCost(materialiProjektit, materiali);
        } else {
            Materiali oldMateriali = materialiRepository.findWithLockingByMaterialiId(oldMaterialId)
                    .orElseThrow(() -> new IllegalArgumentException("Materiali ekzistues nuk u gjet."));
            oldMateriali.setSasiaStokut((oldMateriali.getSasiaStokut() == null ? 0 : oldMateriali.getSasiaStokut()) + oldQuantity);

            Materiali newMateriali = materialiRepository.findWithLockingByMaterialiId(newMaterialId)
                    .orElseThrow(() -> new IllegalArgumentException("Materiali nuk u gjet."));
            if (newMateriali.getSasiaStokut() == null || newMateriali.getSasiaStokut() < newQuantity) {
                throw new IllegalArgumentException("Stoku nuk mjafton per kete material.");
            }
            newMateriali.setSasiaStokut(newMateriali.getSasiaStokut() - newQuantity);
            materialiProjektit.setMateriali(newMateriali);
            materialeCost(materialiProjektit, newMateriali);
        }

        materialiProjektit.setMpId(id);
        return Optional.of(materialiProjektitRepository.save(materialiProjektit));
    }

    @Transactional
    public boolean delete(Integer id) {
        Optional<MaterialiProjektit> existingOptional = materialiProjektitRepository.findById(id);
        if (existingOptional.isEmpty()) {
            return false;
        }
        MaterialiProjektit existing = existingOptional.get();
        Materiali materiali = materialiRepository.findWithLockingByMaterialiId(existing.getMateriali().getMaterialiId())
                .orElseThrow(() -> new IllegalArgumentException("Materiali nuk u gjet."));
        materiali.setSasiaStokut((materiali.getSasiaStokut() == null ? 0 : materiali.getSasiaStokut())
                + (existing.getSasia() == null ? 0 : existing.getSasia()));
        materialiProjektitRepository.deleteById(id);
        return true;
    }

    private void validate(MaterialiProjektit materialiProjektit) {
        if (materialiProjektit == null) {
            throw new IllegalArgumentException("Perdorimi i materialit nuk mund te jete bosh.");
        }
        if (materialiProjektit.getProjekti() == null || materialiProjektit.getProjekti().getProjektiId() == null) {
            throw new IllegalArgumentException("Projekti eshte i detyrueshem.");
        }
        if (materialiProjektit.getMateriali() == null || materialiProjektit.getMateriali().getMaterialiId() == null) {
            throw new IllegalArgumentException("Materiali eshte i detyrueshem.");
        }
        if (materialiProjektit.getSasia() == null || materialiProjektit.getSasia() <= 0) {
            throw new IllegalArgumentException("Sasia e perdorur duhet te jete me e madhe se zero.");
        }
    }

    private void materialeCost(MaterialiProjektit materialiProjektit, Materiali materiali) {
        if (materialiProjektit.getCmimiTotal() == null && materiali.getCmimiPerNjesi() != null) {
            materialiProjektit.setCmimiTotal(materiali.getCmimiPerNjesi()
                    .multiply(BigDecimal.valueOf(materialiProjektit.getSasia())));
        }
        if (materialiProjektit.getDataPerdorimit() == null) {
            materialiProjektit.setDataPerdorimit(LocalDate.now());
        }
    }

    private StockMovement createUsageMovement(MaterialiProjektit saved, Materiali materiali, int sasia) {
        StockMovement movement = new StockMovement();
        movement.setMateriali(materiali);
        movement.setTipi("OUT");
        movement.setSasia(sasia);
        movement.setData(saved.getDataPerdorimit() == null ? LocalDate.now() : saved.getDataPerdorimit());
        String projectName = saved.getProjekti() == null ? null : saved.getProjekti().getEmriProjektit();
        movement.setPershkrimi(projectName == null
                ? "Material i lidhur me projekt."
                : "Material i lidhur me projekt: " + projectName);
        return movement;
    }
}
