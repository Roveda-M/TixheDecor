package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.DetyrimiProjektit;
import com.TixheDecor.backend.service.DetyrimiProjektitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detyrimet-projektit")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Detyrat e Projekteve", description = "Menaxhimi i detyrave ne dashboard dhe worker dashboard")
public class DetyrimiProjektitController {

    @Autowired
    private DetyrimiProjektitService detyrimiProjektitService;

    @GetMapping
    @Operation(summary = "Merr te gjitha detyrat")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DetyrimiProjektit> getAll() {
        return detyrimiProjektitService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr detyren me ID")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DetyrimiProjektit> getById(@PathVariable Integer id) {
        return detyrimiProjektitService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/projekti/{projektiId}")
    @Operation(summary = "Merr detyrat sipas projektit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DetyrimiProjektit> getByProjekti(@PathVariable Integer projektiId) {
        return detyrimiProjektitService.getByProjekti(projektiId);
    }

    @GetMapping("/punetori/{punetoriId}")
    @Operation(summary = "Merr detyrat sipas punetorit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DetyrimiProjektit> getByPunetori(@PathVariable Integer punetoriId) {
        return detyrimiProjektitService.getByPunetori(punetoriId);
    }

    @GetMapping("/statusi/{statusi}")
    @Operation(summary = "Merr detyrat sipas statusit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<DetyrimiProjektit> getByStatusi(@PathVariable String statusi) {
        return detyrimiProjektitService.getByStatusi(statusi);
    }

    @GetMapping("/my")
    @Operation(summary = "Merr detyrat e punetorit te kycur")
    @PreAuthorize("hasAnyAuthority('ROLE_WORKER', 'ROLE_ADMIN')")
    public List<DetyrimiProjektit> getMyTasks() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return detyrimiProjektitService.getByPunetoriEmail(email);
    }

    @PostMapping
    @Operation(summary = "Krijo detyre projekti")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public DetyrimiProjektit create(@RequestBody DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitService.create(detyrimiProjektit);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso detyren e projektit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DetyrimiProjektit> update(@PathVariable Integer id,
                                                    @RequestBody DetyrimiProjektit detyrimiProjektit) {
        return detyrimiProjektitService.update(id, detyrimiProjektit)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Perditeso statusin e detyres nga punetori")
    @PreAuthorize("hasAnyAuthority('ROLE_WORKER', 'ROLE_ADMIN')")
    public ResponseEntity<DetyrimiProjektit> updateMyStatus(@PathVariable Integer id,
                                                            @RequestBody java.util.Map<String, String> body) {
        try {
            String email = SecurityContextHolder.getContext().getAuthentication().getName();
            return detyrimiProjektitService.updateStatusForPunetori(email, id, body.get("statusi"))
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi detyren e projektit")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!detyrimiProjektitService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Detyrimi i projektit u fshi me sukses!");
    }
}
