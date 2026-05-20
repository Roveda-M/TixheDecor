package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.RefreshToken;
import com.TixheDecor.backend.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refresh-tokens")
@CrossOrigin(origins = "http://localhost:3000")
public class RefreshTokenController {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @GetMapping
    public List<RefreshToken> getAll() {
        return refreshTokenRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RefreshToken> getById(@PathVariable Integer id) {
        return refreshTokenRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public RefreshToken create(@RequestBody RefreshToken refreshToken) {
        return refreshTokenRepository.save(refreshToken);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RefreshToken> update(@PathVariable Integer id, @RequestBody RefreshToken refreshToken) {
        if (!refreshTokenRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        refreshToken.setTokenId(id);
        return ResponseEntity.ok(refreshTokenRepository.save(refreshToken));
    }

    @PatchMapping("/{id}/revoko")
    public ResponseEntity<RefreshToken> revoke(@PathVariable Integer id) {
        return refreshTokenRepository.findById(id)
                .map(refreshToken -> {
                    refreshToken.setIsRevoked(true);
                    return ResponseEntity.ok(refreshTokenRepository.save(refreshToken));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        if (!refreshTokenRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        refreshTokenRepository.deleteById(id);
        return ResponseEntity.ok("Refresh token u fshi me sukses!");
    }
}
