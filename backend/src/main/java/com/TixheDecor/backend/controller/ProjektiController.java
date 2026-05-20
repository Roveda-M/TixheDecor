package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Projekti;
import com.TixheDecor.backend.repository.ProjektiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projektet")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjektiController {

    @Autowired
    private ProjektiRepository projektiRepository;

    @GetMapping
    public List<Projekti> getAll() {
        return projektiRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projekti> getById(@PathVariable Integer id) {
        return projektiRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Projekti> getByKlienti(@PathVariable Integer klientiId) {
        return projektiRepository.findByKlientiKlientiId(klientiId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<Projekti> getByStatusi(@PathVariable String statusi) {
        return projektiRepository.findByStatusi(statusi);
    }

    @PostMapping
    public Projekti create(@RequestBody Projekti projekti) {
        return projektiRepository.save(projekti);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projekti> update(@PathVariable Integer id, @RequestBody Projekti projekti) {
        if (!projektiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projekti.setProjektiId(id);
        return ResponseEntity.ok(projektiRepository.save(projekti));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!projektiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        projektiRepository.deleteById(id);
        return ResponseEntity.ok("Projekti u fshi me sukses!");
    }
}
