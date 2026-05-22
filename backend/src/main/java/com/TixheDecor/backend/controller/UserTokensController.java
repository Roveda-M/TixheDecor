package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserTokens;
import com.TixheDecor.backend.service.UserTokensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-tokens")
@CrossOrigin(origins = "http://localhost:3000")
public class UserTokensController {

    @Autowired
    private UserTokensService userTokensService;

    @GetMapping
    public List<UserTokens> getAll() {
        return userTokensService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTokens> getById(@PathVariable Integer id) {
        return userTokensService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public List<UserTokens> getByUser(@PathVariable Long userId) {
        return userTokensService.getByUser(userId);
    }

    @PostMapping
    public UserTokens create(@RequestBody UserTokens userTokens) {
        return userTokensService.create(userTokens);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserTokens> update(@PathVariable Integer id, @RequestBody UserTokens userTokens) {
        return userTokensService.update(id, userTokens)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/revoko")
    public ResponseEntity<UserTokens> revoke(@PathVariable Integer id) {
        return userTokensService.revoke(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!userTokensService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Token i perdoruesit u fshi me sukses!");
    }
}
