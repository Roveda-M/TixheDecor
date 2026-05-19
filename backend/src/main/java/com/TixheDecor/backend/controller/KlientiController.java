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

    // GET të gjithë klientët
    @GetMapping
    public List<Klienti> getAll() {
        return klientiService.getAll();
    }

    // GET klienti me ID
    @GetMapping("/{id}")
    public ResponseEntity<Klienti> getById(@PathVariable Integer id) {
        return klientiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST krijo klient
    @PostMapping
    public Klienti create(@RequestBody Klienti klienti) {
        return klientiService.create(klienti);
    }

    // PUT modifiko klientin
    @PutMapping("/{id}")
    public ResponseEntity<Klienti> update(@PathVariable Integer id,
                                          @RequestBody Klienti klienti) {
        return ResponseEntity.ok(klientiService.update(id, klienti));
    }

    // DELETE fshi klientin
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        klientiService.delete(id);
        return ResponseEntity.ok("Klienti u fshi me sukses!");
    }

    // GET klientët sipas statusit
    @GetMapping("/statusi/{statusi}")
    public List<Klienti> getByStatusi(@PathVariable String statusi) {
        return klientiService.getByStatusi(statusi);
    }
}
