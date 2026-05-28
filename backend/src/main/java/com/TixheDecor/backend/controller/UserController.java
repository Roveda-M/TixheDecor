package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Users", description = "Menaxhimi i perdoruesve nga administratori")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Merr te gjithe perdoruesit")
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Merr perdoruesin me ID")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Krijo perdorues")
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Perditeso perdoruesin")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/aktivizo")
    @Operation(summary = "Aktivizo perdoruesin")
    public ResponseEntity<User> aktivizo(@PathVariable Long id) {
        return userService.ndryshoStatusin(id, "Aktiv")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/deaktivizo")
    @Operation(summary = "Deaktivizo perdoruesin")
    public ResponseEntity<User> deaktivizo(@PathVariable Long id) {
        return userService.ndryshoStatusin(id, "Joaktiv")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Fshi perdoruesin")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!userService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Perdoruesi u fshi me sukses!");
    }
}
