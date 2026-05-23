package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Projekti;
import com.TixheDecor.backend.service.ProjektiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Projekti", description = "Menaxhimi i projekteve")
@RestController
@RequestMapping("/api/projektet")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ProjektiController {

    @Autowired
    private ProjektiService projektiService;

    @Operation(summary = "Merr të gjitha projektet")
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Projekti> getAll() {
        return projektiService.getAll();
    }

    @Operation(summary = "Merr projektin me ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Projekti> getById(@PathVariable Integer id) {
        return projektiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Merr projektet sipas klientit")
    @GetMapping("/klienti/{klientiId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Projekti> getByKlienti(@PathVariable Integer klientiId) {
        return projektiService.getByKlienti(klientiId);
    }

    @Operation(summary = "Merr projektet sipas statusit")
    @GetMapping("/statusi/{statusi}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Projekti> getByStatusi(@PathVariable String statusi) {
        return projektiService.getByStatusi(statusi);
    }

    @Operation(summary = "Krijo projekt të ri")
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Projekti create(@RequestBody Projekti projekti) {
        return projektiService.create(projekti);
    }

    @Operation(summary = "Përditëso projektin")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Projekti> update(@PathVariable Integer id, @RequestBody Projekti projekti) {
        return projektiService.update(id, projekti)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Fshi projektin")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!projektiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Projekti u fshi me sukses!");
    }
}