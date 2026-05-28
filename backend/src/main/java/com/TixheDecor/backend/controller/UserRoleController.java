package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserRole;
import com.TixheDecor.backend.service.UserRoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-roles")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "User Roles", description = "Menaxhimi i roleve te perdoruesve")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @GetMapping
    @Operation(summary = "Merr te gjitha lidhjet user-role")
    public List<UserRole> getAll() {
        return userRoleService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr lidhjen user-role me ID")
    public ResponseEntity<UserRole> getById(@PathVariable Long id) {
        return userRoleService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Merr rolet per nje perdorues")
    public List<UserRole> getByUser(@PathVariable Long userId) {
        return userRoleService.getByUser(userId);
    }

    @PostMapping
    @Operation(summary = "Cakto rol per perdorues")
    public ResponseEntity<UserRole> create(@RequestBody Map<String, String> request) {
        try {
            return ResponseEntity.ok(userRoleService.createByNames(request));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso rolin e perdoruesit")
    public ResponseEntity<UserRole> update(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            return userRoleService.updateByNames(id, request)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi rolin e perdoruesit")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!userRoleService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Roli i perdoruesit u fshi me sukses!");
    }
}
