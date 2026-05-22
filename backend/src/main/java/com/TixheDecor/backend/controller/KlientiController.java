package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Klienti;
import com.TixheDecor.backend.service.KlientiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/klienti")
@CrossOrigin(origins = "http://localhost:3000")
public class KlientiController {

    @Autowired
    private KlientiService klientiService;

    @GetMapping
    public List<Klienti> getAll() {
        return klientiService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Klienti> getById(@PathVariable Integer id) {
        return klientiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Klienti create(@RequestBody Klienti klienti) {
        return klientiService.create(klienti);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Klienti> update(@PathVariable Integer id, @RequestBody Klienti klienti) {
        return klientiService.update(id, klienti)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!klientiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Klienti u fshi me sukses!");
    }

    @GetMapping("/statusi/{statusi}")
    public List<Klienti> getByStatusi(@PathVariable String statusi) {
        return klientiService.getByStatusi(statusi);
    }
}
