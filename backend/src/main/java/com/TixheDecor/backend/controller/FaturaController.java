package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fatura;
import com.TixheDecor.backend.service.FaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faturat")
@CrossOrigin(origins = "http://localhost:3000")
public class FaturaController {

    @Autowired
    private FaturaService faturaService;

    @GetMapping
    public List<Fatura> getAll() {
        return faturaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fatura> getById(@PathVariable Integer id) {
        return faturaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Fatura> getByProjekti(@PathVariable Integer projektiId) {
        return faturaService.getByProjekti(projektiId);
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Fatura> getByKlienti(@PathVariable Integer klientiId) {
        return faturaService.getByKlienti(klientiId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<Fatura> getByStatusi(@PathVariable String statusi) {
        return faturaService.getByStatusi(statusi);
    }

    @PostMapping
    public Fatura create(@RequestBody Fatura fatura) {
        return faturaService.create(fatura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fatura> update(@PathVariable Integer id, @RequestBody Fatura fatura) {
        return faturaService.update(id, fatura)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!faturaService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Fatura u fshi me sukses!");
    }
}
