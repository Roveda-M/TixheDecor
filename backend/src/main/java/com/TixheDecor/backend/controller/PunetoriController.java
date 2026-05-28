package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Punetori;
import com.TixheDecor.backend.service.PunetoriService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/punetoret")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Punetoret", description = "Menaxhimi i punetoreve nga dashboard-i")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class PunetoriController {

    @Autowired
    private PunetoriService punetoriService;

    @GetMapping
    @Operation(summary = "Merr te gjithe punetoret")
    public List<Punetori> getAll() {
        return punetoriService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr punetorin me ID")
    public ResponseEntity<Punetori> getById(@PathVariable Integer id) {
        return punetoriService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    @Operation(summary = "Filtro punetoret sipas statusit")
    public List<Punetori> getByStatusi(@PathVariable String statusi) {
        return punetoriService.getByStatusi(statusi);
    }

    @PostMapping
    @Operation(summary = "Krijo punetor")
    public ResponseEntity<?> create(@RequestBody Punetori punetori) {
        try {
            return ResponseEntity.ok(punetoriService.create(punetori));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso punetorin")
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
    @Operation(summary = "Fshi punetorin")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!punetoriService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Punetori u fshi me sukses!");
    }
}
