package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import com.TixheDecor.backend.service.DetyrimiProjektitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detyrimet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
public class DetyrimiProjektitController {

    @Autowired
    private DetyrimiProjektitService detyrimiProjektitService;

    @GetMapping
    public List<DetyrimiProjektit> getAll() {
        return detyrimiProjektitService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetyrimiProjektit> getById(@PathVariable Integer id) {
        return detyrimiProjektitService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<DetyrimiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return detyrimiProjektitService.getByProjekti(projektiId);
    }

    @GetMapping("/punetori/{punetoriId}")
    public List<DetyrimiProjektit> getByPunetori(@PathVariable Integer punetoriId) {
        return detyrimiProjektitService.getByPunetori(punetoriId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<DetyrimiProjektit> getByStatusi(@PathVariable String statusi) {
        return detyrimiProjektitService.getByStatusi(statusi);
    }

    @PostMapping
    public DetyrimiProjektit create(@RequestBody DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitService.create(detyrimiProjektit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetyrimiProjektit> update(@PathVariable Integer id,
                                                    @RequestBody DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitService.update(id, detyrimiProjektit)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!detyrimiProjektitService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Detyrimi i projektit u fshi me sukses!");
    }
}
