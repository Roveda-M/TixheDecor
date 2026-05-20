package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.MaterialiProjektit;
import com.TixheDecor.backend.repository.MaterialiProjektitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiProjektitController {

    @Autowired
    private MaterialiProjektitRepository materialiProjektitRepository;

    @GetMapping
    public List<MaterialiProjektit> getAll() {
        return materialiProjektitRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialiProjektit> getById(@PathVariable Integer id) {
        return materialiProjektitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<MaterialiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return materialiProjektitRepository.findByProjektiProjektiId(projektiId);
    }

    @GetMapping("/materiali/{materialiId}")
    public List<MaterialiProjektit> getByMateriali(@PathVariable Integer materialiId) {
        return materialiProjektitRepository.findBymaterialiMaterialiId(materialiId);
    }

    @PostMapping
    public MaterialiProjektit create(@RequestBody MaterialiProjektit materialiProjektit) {
        return materialiProjektitRepository.save(materialiProjektit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaterialiProjektit> update(@PathVariable Integer id,
                                                     @RequestBody MaterialiProjektit materialiProjektit) {
        if (!materialiProjektitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        materialiProjektit.setMpId(id);
        return ResponseEntity.ok(materialiProjektitRepository.save(materialiProjektit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiProjektitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        materialiProjektitRepository.deleteById(id);
        return ResponseEntity.ok("Materiali i projektit u fshi me sukses!");
    }
}
