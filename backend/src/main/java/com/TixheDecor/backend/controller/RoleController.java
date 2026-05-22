package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public List<Role> getAll() {
        return roleService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getById(@PathVariable Long id) {
        return roleService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Role create(@RequestBody Role role) {
        return roleService.create(role);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role role) {
        return roleService.update(id, role)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!roleService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Roli u fshi me sukses!");
    }
}
