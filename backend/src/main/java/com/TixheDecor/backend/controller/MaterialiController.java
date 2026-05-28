package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Materiali;
import com.TixheDecor.backend.service.MaterialiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Materiali", description = "Menaxhimi i inventarit te materialeve")
@RequestMapping("/api/materialet")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiController {

    @Autowired
    private MaterialiService materialiService;

    @GetMapping
    @Operation(summary = "Merr te gjitha materialet")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<Materiali> getAll() {
        return materialiService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr materialin me ID")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<Materiali> getById(@PathVariable Integer id) {
        return materialiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/kategoria/{kategoria}")
    @Operation(summary = "Merr materialet sipas kategorise")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<Materiali> getByKategoria(@PathVariable String kategoria) {
        return materialiService.getByKategoria(kategoria);
    }

    @GetMapping("/furnitori/{furnitoriId}")
    @Operation(summary = "Merr materialet sipas furnitorit")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<Materiali> getByFurnitori(@PathVariable Integer furnitoriId) {
        return materialiService.getByFurnitori(furnitoriId);
    }

    @PostMapping
    @Operation(summary = "Krijo material te ri")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public Materiali create(@RequestBody Materiali materiali) {
        return materialiService.create(materiali);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso materialin")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<Materiali> update(@PathVariable Integer id, @RequestBody Materiali materiali) {
        return materialiService.update(id, materiali)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi materialin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Materiali u fshi me sukses!");
    }
}
