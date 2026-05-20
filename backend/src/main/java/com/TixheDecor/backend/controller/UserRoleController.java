package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserRole;
import com.TixheDecor.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
@CrossOrigin(origins = "http://localhost:3000")
public class UserRoleController {

    @Autowired
    private UserRoleRepository userRoleRepository;
    @GetMapping
    public List<UserRole> getAll() {
        return userRoleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRole> getById(@PathVariable Integer id) {
        return userRoleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<UserRole> getByUser(@PathVariable Long userId) {
        return userRoleRepository.findByUserId(userId);
    }

    @PostMapping
    public UserRole create(@RequestBody UserRole userRole) {
        return userRoleRepository.save(userRole);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserRole> update(@PathVariable Integer id, @RequestBody UserRole userRole) {
        if (!userRoleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userRole.setId(id.longValue());
        return ResponseEntity.ok(userRoleRepository.save(userRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!userRoleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userRoleRepository.deleteById(id);
        return ResponseEntity.ok("Roli i perdoruesit u fshi me sukses!");
    }
}
