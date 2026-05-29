package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Vleresimi;
import com.TixheDecor.backend.service.VleresimiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Tag(name = "Vleresimi", description = "Menaxhimi i vlerësimeve")
@RestController
@RequestMapping("/api/vleresimet")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class VleresimiController {

    @Autowired
    private VleresimiService vleresimiService;

    @Operation(summary = "Merr të gjitha vlerësimet")
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Vleresimi> getAll() {
        return vleresimiService.getAll();
    }

    @Operation(summary = "Merr vlerësimin me ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Vleresimi> getById(@PathVariable Integer id) {
        return vleresimiService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Merr vlerësimet sipas projektit")
    @GetMapping("/projekti/{projektiId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Vleresimi> getByProjekti(@PathVariable Integer projektiId) {
        return vleresimiService.getByProjekti(projektiId);
    }

    @Operation(summary = "Merr vlerësimet sipas klientit")
    @GetMapping("/klienti/{klientiId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Vleresimi> getByKlienti(@PathVariable Integer klientiId) {
        return vleresimiService.getByKlienti(klientiId);
    }

    @Operation(summary = "Krijo vlerësim të ri")
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Vleresimi create(@RequestBody Vleresimi vleresimi) {
        return vleresimiService.create(vleresimi);
    }

    @Operation(summary = "Dergo feedback nga perdoruesi i kycur")
    @PostMapping("/feedback")
    @PreAuthorize("hasAnyAuthority('ROLE_USER', 'ROLE_ADMIN')")
    public Vleresimi createFeedback(@RequestBody Vleresimi vleresimi) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return vleresimiService.createFeedbackForUser(email, vleresimi);
    }

    @Operation(summary = "Përditëso vlerësimin")
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Vleresimi> update(@PathVariable Integer id, @RequestBody Vleresimi vleresimi) {
        return vleresimiService.update(id, vleresimi)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Fshi vlerësimin")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!vleresimiService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Vleresimi u fshi me sukses!");
    }
}
