package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Furnitori;
import com.TixheDecor.backend.service.FurnitoriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "http://localhost:3000")
public class FurnitoriController {

    @Autowired
    private FurnitoriService furnitoriService;

    @GetMapping
    public List<Furnitori> getAll() {
        return furnitoriService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Furnitori> getById(@PathVariable Integer id) {
        return furnitoriService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    public List<Furnitori> getByStatusi(@PathVariable String statusi) {
        return furnitoriService.getByStatusi(statusi);
    }

    @PostMapping
    public Furnitori create(@RequestBody Furnitori furnitori) {
        return furnitoriService.create(furnitori);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Furnitori> update(@PathVariable Integer id, @RequestBody Furnitori furnitori) {
        return furnitoriService.update(id, furnitori)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!furnitoriService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Furnitori u fshi me sukses!");
    }
}
