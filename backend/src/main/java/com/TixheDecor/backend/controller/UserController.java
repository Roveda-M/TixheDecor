package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User create(@RequestBody User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    user.setId(id);
                    if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
                        user.setPasswordHash(existing.getPasswordHash());
                    } else if (!user.getPasswordHash().startsWith("$2a$")
                            && !user.getPasswordHash().startsWith("$2b$")
                            && !user.getPasswordHash().startsWith("$2y$")) {
                        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
                    }
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/aktivizo")
    public ResponseEntity<User> aktivizo(@PathVariable Long id) {
        return ndryshoStatusin(id, "Aktiv");
    }

    @PatchMapping("/{id}/deaktivizo")
    public ResponseEntity<User> deaktivizo(@PathVariable Long id) {
        return ndryshoStatusin(id, "Joaktiv");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userRepository.deleteById(id);
        return ResponseEntity.ok("Perdoruesi u fshi me sukses!");
    }

    private ResponseEntity<User> ndryshoStatusin(Long id, String statusi) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setStatusi(statusi);
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
