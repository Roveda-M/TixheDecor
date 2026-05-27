package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.service.PunetoriService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punetoret")
@CrossOrigin(origins = "http://localhost:3000")
public class PunetoriController {

    @Autowired
    private PunetoriService punetoriService;

    @GetMapping
    public List<Punetori> getAll() {
        return punetoriService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Punetori> getById(@PathVariable Integer id) {
        return punetoriService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    public List<Punetori> getByStatusi(@PathVariable String statusi) {
        return punetoriService.getByStatusi(statusi);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Punetori punetori) {
        try {
            return ResponseEntity.ok(punetoriService.create(punetori));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Punetori punetori) {
        try {
            return punetoriService.update(id, punetori)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!punetoriService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Punetori u fshi me sukses!");
    }
}
