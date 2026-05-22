package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Projekti;
import com.TixheDecor.backend.service.ProjektiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projektet")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjektiController {

    @Autowired
    private ProjektiService projektiService;

    @GetMapping
    public List<Projekti> getAll() {
        return projektiService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Projekti> getById(@PathVariable Integer id) {
        return projektiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Projekti> getByKlienti(@PathVariable Integer klientiId) {
        return projektiService.getByKlienti(klientiId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<Projekti> getByStatusi(@PathVariable String statusi) {
        return projektiService.getByStatusi(statusi);
    }

    @PostMapping
    public Projekti create(@RequestBody Projekti projekti) {
        return projektiService.create(projekti);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Projekti> update(@PathVariable Integer id, @RequestBody Projekti projekti) {
        return projektiService.update(id, projekti)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!projektiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Projekti u fshi me sukses!");
    }
}
