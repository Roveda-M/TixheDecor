package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Pagesa;
import com.TixheDecor.backend.service.PagesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagesat")
@CrossOrigin(origins = "http://localhost:3000")
public class PagesaController {

    @Autowired
    private PagesaService pagesaService;

    @GetMapping
    public List<Pagesa> getAll() {
        return pagesaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pagesa> getById(@PathVariable Integer id) {
        return pagesaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/fatura/{faturaId}")
    public List<Pagesa> getByFatura(@PathVariable Integer faturaId) {
        return pagesaService.getByFatura(faturaId);
    }

    @GetMapping("/statusi/{statusi}")
    public List<Pagesa> getByStatusi(@PathVariable String statusi) {
        return pagesaService.getByStatusi(statusi);
    }

    @PostMapping
    public Pagesa create(@RequestBody Pagesa pagesa) {
        return pagesaService.create(pagesa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pagesa> update(@PathVariable Integer id, @RequestBody Pagesa pagesa) {
        return pagesaService.update(id, pagesa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!pagesaService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Pagesa u fshi me sukses!");
    }
}
