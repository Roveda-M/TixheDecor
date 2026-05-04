package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.security.JwtUtil;
import com.TixheDecor.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("username");
        String password = body.get("password");

        boolean valid = userService.validateLogin(email, password);

        if (!valid) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", "Email ose fjalëkalimi gabim"));
        }

        String accessToken = jwtUtil.generateToken(email);
        String refreshToken = jwtUtil.generateRefreshToken(email);

        return ResponseEntity.ok(Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        try {
            User user = userService.registerUser(email, password);
            return ResponseEntity.ok(Map.of("message", "Regjistrim i suksesshëm!"));
        } catch (Exception e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", "Email ekziston tashmë"));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");

        try {
            String email = jwtUtil.extractEmail(refreshToken);
            if (jwtUtil.validateToken(refreshToken)) {
                String newAccessToken = jwtUtil.generateToken(email);
                return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("error", e.getMessage()));
        }

        return ResponseEntity.status(401)
                .body(Map.of("error", "Refresh token invalid"));
    }
}