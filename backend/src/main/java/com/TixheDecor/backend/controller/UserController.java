package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return userService.update(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/aktivizo")
    public ResponseEntity<User> aktivizo(@PathVariable Long id) {
        return userService.ndryshoStatusin(id, "Aktiv")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/deaktivizo")
    public ResponseEntity<User> deaktivizo(@PathVariable Long id) {
        return userService.ndryshoStatusin(id, "Joaktiv")
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!userService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Perdoruesi u fshi me sukses!");
    }
}
