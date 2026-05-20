package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import com.TixheDecor.backend.repository.DetyrimiProjektitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detyrimet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
public class DetyrimiProjektitController {

    @Autowired
    private DetyrimiProjektitRepository detyrimiProjektitRepository;

    @GetMapping
    public List<DetyrimiProjektit> getAll() {
        return detyrimiProjektitRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetyrimiProjektit> getById(@PathVariable Integer id) {
        return detyrimiProjektitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<DetyrimiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return detyrimiProjektitRepository.findByProjektiProjektiId(projektiId);
    }

    @GetMapping("/punetori/{punetoriId}")
    public List<DetyrimiProjektit> getByPunetori(@PathVariable Integer punetoriId) {
        return detyrimiProjektitRepository.findByPunetoriPunetoriId(punetoriId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<DetyrimiProjektit> getByStatusi(@PathVariable String statusi) {
        return detyrimiProjektitRepository.findByStatusi(statusi);
    }

    @PostMapping
    public DetyrimiProjektit create(@RequestBody DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitRepository.save(detyrimiProjektit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DetyrimiProjektit> update(@PathVariable Integer id,
                                                    @RequestBody DetyrimiProjektit detyrimiProjektit) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        detyrimiProjektit.setDetyrimiId(id);
        return ResponseEntity.ok(detyrimiProjektitRepository.save(detyrimiProjektit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!detyrimiProjektitRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        detyrimiProjektitRepository.deleteById(id);
        return ResponseEntity.ok("Detyrimi i projektit u fshi me sukses!");
    }
}
