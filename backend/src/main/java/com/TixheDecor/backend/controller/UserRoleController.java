package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserRole;
import com.TixheDecor.backend.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @GetMapping
    public List<UserRole> getAll() {
        return userRoleService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRole> getById(@PathVariable Long id) {
        return userRoleService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<UserRole> getByUser(@PathVariable Long userId) {
        return userRoleService.getByUser(userId);
    }

    @PostMapping
    public UserRole create(@RequestBody UserRole userRole) {
        return userRoleService.create(userRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserRole> update(@PathVariable Long id, @RequestBody UserRole userRole) {
        return userRoleService.update(id, userRole)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!userRoleService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Roli i perdoruesit u fshi me sukses!");
    }
}
