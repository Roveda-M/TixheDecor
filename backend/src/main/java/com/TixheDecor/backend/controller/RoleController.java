package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Roles", description = "Menaxhimi i roleve te sistemit")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    @Operation(summary = "Merr te gjitha rolet")
    public List<Role> getAll() {
        return roleService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr rolin me ID")
    public ResponseEntity<Role> getById(@PathVariable Long id) {
        return roleService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Krijo rol")
    public ResponseEntity<?> create(@RequestBody Role role) {
        try {
            return ResponseEntity.ok(roleService.create(role));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso rolin")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Role role) {
        try {
            return roleService.update(id, role)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi rolin")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!roleService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Roli u fshi me sukses!");
    }
}
