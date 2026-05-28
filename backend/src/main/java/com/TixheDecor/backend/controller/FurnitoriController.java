package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Furnitori;
import com.TixheDecor.backend.service.FurnitoriService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Furnitori", description = "Menaxhimi i furnitoreve")
@RequestMapping("/api/furnitoret")
@CrossOrigin(origins = "http://localhost:3000")
public class FurnitoriController {

    @Autowired
    private FurnitoriService furnitoriService;

    @GetMapping
    @Operation(summary = "Merr te gjithe furnitoret")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<Furnitori> getAll() {
        return furnitoriService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr furnitorin me ID")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<Furnitori> getById(@PathVariable Integer id) {
        return furnitoriService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/statusi/{statusi}")
    @Operation(summary = "Merr furnitoret sipas statusit")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<Furnitori> getByStatusi(@PathVariable String statusi) {
        return furnitoriService.getByStatusi(statusi);
    }

    @PostMapping
    @Operation(summary = "Krijo furnitor te ri")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public Furnitori create(@RequestBody Furnitori furnitori) {
        return furnitoriService.create(furnitori);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso furnitorin")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<Furnitori> update(@PathVariable Integer id, @RequestBody Furnitori furnitori) {
        return furnitoriService.update(id, furnitori)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi furnitorin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!furnitoriService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Furnitori u fshi me sukses!");
    }
}
