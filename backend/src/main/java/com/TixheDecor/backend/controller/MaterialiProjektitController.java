package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.MaterialiProjektit;
import com.TixheDecor.backend.service.MaterialiProjektitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiProjektitController {

    @Autowired
    private MaterialiProjektitService materialiProjektitService;

    @GetMapping
    public List<MaterialiProjektit> getAll() {
        return materialiProjektitService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaterialiProjektit> getById(@PathVariable Integer id) {
        return materialiProjektitService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<MaterialiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return materialiProjektitService.getByProjekti(projektiId);
    }

    @GetMapping("/materiali/{materialiId}")
    public List<MaterialiProjektit> getByMateriali(@PathVariable Integer materialiId) {
        return materialiProjektitService.getByMateriali(materialiId);
    }

    @PostMapping
    public MaterialiProjektit create(@RequestBody MaterialiProjektit materialiProjektit) {
        return materialiProjektitService.create(materialiProjektit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MaterialiProjektit> update(@PathVariable Integer id,
                                                     @RequestBody MaterialiProjektit materialiProjektit) {
        return materialiProjektitService.update(id, materialiProjektit)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiProjektitService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Materiali i projektit u fshi me sukses!");
    }
}
