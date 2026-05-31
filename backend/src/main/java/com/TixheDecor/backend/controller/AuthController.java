package com.TixheDecor.backend.controller;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.TixheDecor.backend.dto.LoginRequest;
import com.TixheDecor.backend.dto.RegisterRequest;
import com.TixheDecor.backend.dto.UserProfileDto;
import com.TixheDecor.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.springframework.security.core.context.SecurityContextHolder;
import com.TixheDecor.backend.service.UserService;

@Tag(name = "Authentication", description = "Login, Register, Refresh Token")
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;



    @Operation(summary = "Login", description = "Kyçje me email dhe fjalëkalim")
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

    @Operation(summary = "Register", description = "Regjistrim i përdoruesit të ri")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {

                    authService.register(
                            request.getEmail(),
                            request.getPassword(),
                            request.getFullname(),
                            request.getUsername()

            );
            return ResponseEntity.ok(Map.of("message", "Regjistrim i suksesshëm!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Merr profilin e userit")
    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication().getName();
        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(new UserProfileDto(
                        user.getId(),
                        user.getEmail(),
                        user.getEmri(),
                        user.getMbiemri(),
                        user.getFullname(),
                        user.getUsername(),
                        user.getPhoneNumber(),
                        user.getStatusi()
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Refresh Token", description = "Rinovim i access token")
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

    @Operation(summary = "Forgot Password", description = "Kërkesë për rivendosje fjalëkalimi")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Emaili eshte i detyrueshem"));
        }
        try {
            return ResponseEntity.ok(authService.forgotPassword(email));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @Operation(summary = "Reset Password", description = "Rivendosje e fjalëkalimit")
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        try {
            String token = body.get("token");
            String password = body.get("password");
            if (token == null || token.isBlank()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Token mungon"));
            }
            authService.resetPassword(token, password);
            return ResponseEntity.ok(Map.of("message", "Fjalëkalimi u ndryshua me sukses"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
