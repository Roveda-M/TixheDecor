package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.MaterialiProjektit;
import com.TixheDecor.backend.service.MaterialiProjektitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Materiali Projektit", description = "Lidhja e materialeve me projektet dhe perdorimi i stokut")
@RequestMapping("/api/materialet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
public class MaterialiProjektitController {

    @Autowired
    private MaterialiProjektitService materialiProjektitService;

    @GetMapping
    @Operation(summary = "Merr te gjitha perdorimet e materialeve ne projekte")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<MaterialiProjektit> getAll() {
        return materialiProjektitService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr perdorimin e materialit me ID")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<MaterialiProjektit> getById(@PathVariable Integer id) {
        return materialiProjektitService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    @Operation(summary = "Merr materialet e perdorura ne nje projekt")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<MaterialiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return materialiProjektitService.getByProjekti(projektiId);
    }

    @GetMapping("/materiali/{materialiId}")
    @Operation(summary = "Merr perdorimet sipas materialit")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public List<MaterialiProjektit> getByMateriali(@PathVariable Integer materialiId) {
        return materialiProjektitService.getByMateriali(materialiId);
    }

    @PostMapping
    @Operation(summary = "Lidh materialin me projektin dhe zbrit stokun")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public MaterialiProjektit create(@RequestBody MaterialiProjektit materialiProjektit) {
        return materialiProjektitService.create(materialiProjektit);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso perdorimin e materialit dhe rregullo stokun")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_MANAGER')")
    public ResponseEntity<MaterialiProjektit> update(@PathVariable Integer id,
                                                     @RequestBody MaterialiProjektit materialiProjektit) {
        return materialiProjektitService.update(id, materialiProjektit)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi perdorimin e materialit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!materialiProjektitService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Materiali i projektit u fshi me sukses!");
    }
}
