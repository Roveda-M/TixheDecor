package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Furnitori;
import com.TixheDecor.backend.repository.FurnitoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "http://localhost:3000")
public class FurnitoriController {

    @Autowired
    private FurnitoriRepository furnitoriRepository;

    @GetMapping
    public List<Furnitori> getAll() {
        return furnitoriRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Furnitori> getById(@PathVariable Integer id) {
        return furnitoriRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    public List<Furnitori> getByStatusi(@PathVariable String statusi) {
        return furnitoriRepository.findByStatusi(statusi);
    }

    @PostMapping
    public Furnitori create(@RequestBody Furnitori furnitori) {
        return furnitoriRepository.save(furnitori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Furnitori> update(@PathVariable Integer id, @RequestBody Furnitori furnitori) {
        if (!furnitoriRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        furnitori.setFurnitoriId(id);
        return ResponseEntity.ok(furnitoriRepository.save(furnitori));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!furnitoriRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        furnitoriRepository.deleteById(id);
        return ResponseEntity.ok("Furnitori u fshi me sukses!");
    }
}
