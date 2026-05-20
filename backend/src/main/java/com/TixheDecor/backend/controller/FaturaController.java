package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fatura;
import com.TixheDecor.backend.repository.FaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faturat")
@CrossOrigin(origins = "http://localhost:3000")
public class FaturaController {

    @Autowired
    private FaturaRepository faturaRepository;

    @GetMapping
    public List<Fatura> getAll() {
        return faturaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fatura> getById(@PathVariable Integer id) {
        return faturaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    public List<Fatura> getByProjekti(@PathVariable Integer projektiId) {
        return faturaRepository.findByProjektiProjektiId(projektiId);
    }

    @GetMapping("/klienti/{klientiId}")
    public List<Fatura> getByKlienti(@PathVariable Integer klientiId) {
        return faturaRepository.findByKlientiKlientiId(klientiId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<Fatura> getByStatusi(@PathVariable String statusi) {
        return faturaRepository.findByStatusi(statusi);
    }

    @PostMapping
    public Fatura create(@RequestBody Fatura fatura) {
        return faturaRepository.save(fatura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fatura> update(@PathVariable Integer id, @RequestBody Fatura fatura) {
        if (!faturaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        fatura.setFaturaId(id);
        return ResponseEntity.ok(faturaRepository.save(fatura));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!faturaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        faturaRepository.deleteById(id);
        return ResponseEntity.ok("Fatura u fshi me sukses!");
    }
}
