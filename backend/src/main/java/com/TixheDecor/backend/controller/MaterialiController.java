package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Materiali;
import com.TixheDecor.backend.service.MaterialiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materialet")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiController {

    @Autowired
    private MaterialiService materialiService;

    @GetMapping
    public List<Materiali> getAll() {
        return materialiService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materiali> getById(@PathVariable Integer id) {
        return materialiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/kategoria/{kategoria}")
    public List<Materiali> getByKategoria(@PathVariable String kategoria) {
        return materialiService.getByKategoria(kategoria);
    }

    @GetMapping("/furnitori/{furnitoriId}")
    public List<Materiali> getByFurnitori(@PathVariable Integer furnitoriId) {
        return materialiService.getByFurnitori(furnitoriId);
    }

    @PostMapping
    public Materiali create(@RequestBody Materiali materiali) {
        return materialiService.create(materiali);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materiali> update(@PathVariable Integer id, @RequestBody Materiali materiali) {
        return materialiService.update(id, materiali)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Materiali u fshi me sukses!");
    }
}
