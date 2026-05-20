package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Materiali;
import com.TixheDecor.backend.repository.MaterialiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialet")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiController {

    @Autowired
    private MaterialiRepository materialiRepository;

    @GetMapping
    public List<Materiali> getAll() {
        return materialiRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materiali> getById(@PathVariable Integer id) {
        return materialiRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/kategoria/{kategoria}")
    public List<Materiali> getByKategoria(@PathVariable String kategoria) {
        return materialiRepository.findByKategoria(kategoria);
    }

    @GetMapping("/furnitori/{furnitoriId}")
    public List<Materiali> getByFurnitori(@PathVariable Integer furnitoriId) {
        return materialiRepository.findByFurnitoriFurnitoriId(furnitoriId);
    }

    @PostMapping
    public Materiali create(@RequestBody Materiali materiali) {
        return materialiRepository.save(materiali);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materiali> update(@PathVariable Integer id, @RequestBody Materiali materiali) {
        if (!materialiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        materiali.setMaterialiId(id);
        return ResponseEntity.ok(materialiRepository.save(materiali));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        materialiRepository.deleteById(id);
        return ResponseEntity.ok("Materiali u fshi me sukses!");
    }
}
