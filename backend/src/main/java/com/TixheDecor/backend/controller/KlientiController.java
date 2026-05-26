package com.TixheDecor.backend.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.TixheDecor.backend.model.Klienti;
import com.TixheDecor.backend.service.KlientiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Klienti", description = "Menaxhimi i klientëve")
@RestController
@RequestMapping("/api/klienti")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class KlientiController {

    @Autowired
    private KlientiService klientiService;

    @Operation(summary = "Merr të gjithë klientët")
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Klienti> getAll() {
        return klientiService.getAll();
    }

    @Operation(summary = "Merr klientin me ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Klienti> getById(@PathVariable Integer id) {
        return klientiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Krijo klient të ri")
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    public Klienti create(@RequestBody Klienti klienti) {
        return klientiService.create(klienti);
    }

    @Operation(summary = "Përditëso klientin")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Klienti> update(@PathVariable Integer id, @RequestBody Klienti klienti) {
        return klientiService.update(id, klienti)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Fshi klientin")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!klientiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Klienti u fshi me sukses!");
    }

    @Operation(summary = "Filtro klientët sipas statusit")
    @GetMapping("/statusi/{statusi}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Klienti> getByStatusi(@PathVariable String statusi) {
        return klientiService.getByStatusi(statusi);
    }
}
