package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.dto.LoginRequest;
import com.TixheDecor.backend.dto.RegisterRequest;
import com.TixheDecor.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Map<String, String> tokens = authService.login(
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok(tokens);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            authService.register(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of("message", "Regjistrim i suksesshëm!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
        try {
            Map<String, String> tokens = authService.refresh(body.get("refreshToken"));
            return ResponseEntity.ok(tokens);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}