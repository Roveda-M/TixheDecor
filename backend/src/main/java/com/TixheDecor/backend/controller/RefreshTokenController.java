package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.RefreshToken;
import com.TixheDecor.backend.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refresh-tokens")
@CrossOrigin(origins = "http://localhost:3000")
public class RefreshTokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @GetMapping
    public List<RefreshToken> getAll() {
        return refreshTokenService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefreshToken> getById(@PathVariable Integer id) {
        return refreshTokenService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RefreshToken create(@RequestBody RefreshToken refreshToken) {
        return refreshTokenService.create(refreshToken);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RefreshToken> update(@PathVariable Integer id, @RequestBody RefreshToken refreshToken) {
        return refreshTokenService.update(id, refreshToken)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/revoko")
    public ResponseEntity<RefreshToken> revoke(@PathVariable Integer id) {
        return refreshTokenService.revoke(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!refreshTokenService.delete(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok("Refresh token u fshi me sukses!");
    }
}
