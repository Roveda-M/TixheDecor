package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.repository.PunetoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punetoret")
@CrossOrigin(origins = "http://localhost:3000")
public class PunetoriController {

    @Autowired
    private PunetoriRepository punetoriRepository;

    @GetMapping
    public List<Punetori> getAll() {
        return punetoriRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Punetori> getById(@PathVariable Integer id) {
        return punetoriRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    public List<Punetori> getByStatusi(@PathVariable String statusi) {
        return punetoriRepository.findByStatusi(statusi);
    }

    @PostMapping
    public Punetori create(@RequestBody Punetori punetori) {
        return punetoriRepository.save(punetori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Punetori> update(@PathVariable Integer id, @RequestBody Punetori punetori) {
        if (!punetoriRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        punetori.setPunetoriId(id);
        return ResponseEntity.ok(punetoriRepository.save(punetori));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!punetoriRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        punetoriRepository.deleteById(id);
        return ResponseEntity.ok("Punetori u fshi me sukses!");
    }
}
