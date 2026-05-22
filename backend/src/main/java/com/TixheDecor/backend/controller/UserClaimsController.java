package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserClaims;
import com.TixheDecor.backend.service.UserClaimsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-claims")
@CrossOrigin(origins = "http://localhost:3000")
public class UserClaimsController {

    @Autowired
    private UserClaimsService userClaimsService;

    @GetMapping
    public List<UserClaims> getAll() {
        return userClaimsService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserClaims> getById(@PathVariable Integer id) {
        return userClaimsService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<UserClaims> getByUser(@PathVariable Long userId) {
        return userClaimsService.getByUser(userId);
    }

    @PostMapping
    public UserClaims create(@RequestBody UserClaims userClaims) {
        return userClaimsService.create(userClaims);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserClaims> update(@PathVariable Integer id, @RequestBody UserClaims userClaims) {
        return userClaimsService.update(id, userClaims)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!userClaimsService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Claim i perdoruesit u fshi me sukses!");
    }
}
