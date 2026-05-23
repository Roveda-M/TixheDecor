package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Fatura;
import com.TixheDecor.backend.service.FaturaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Fatura", description = "Menaxhimi i faturave")
@RestController
@RequestMapping("/api/faturat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class FaturaController {

    @Autowired
    private FaturaService faturaService;

    @Operation(summary = "Merr të gjitha faturat")
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fatura> getAll() {
        return faturaService.getAll();
    }

    @Operation(summary = "Merr faturën me ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Fatura> getById(@PathVariable Integer id) {
        return faturaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Merr faturat sipas projektit")
    @GetMapping("/projekti/{projektiId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fatura> getByProjekti(@PathVariable Integer projektiId) {
        return faturaService.getByProjekti(projektiId);
    }

    @Operation(summary = "Merr faturat sipas klientit")
    @GetMapping("/klienti/{klientiId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fatura> getByKlienti(@PathVariable Integer klientiId) {
        return faturaService.getByKlienti(klientiId);
    }

    @Operation(summary = "Merr faturat sipas statusit")
    @GetMapping("/statusi/{statusi}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Fatura> getByStatusi(@PathVariable String statusi) {
        return faturaService.getByStatusi(statusi);
    }

    @Operation(summary = "Krijo faturë të re")
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Fatura create(@RequestBody Fatura fatura) {
        return faturaService.create(fatura);
    }

    @Operation(summary = "Përditëso faturën")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Fatura> update(@PathVariable Integer id, @RequestBody Fatura fatura) {
        return faturaService.update(id, fatura)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Fshi faturën")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!faturaService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Fatura u fshi me sukses!");
    }
}