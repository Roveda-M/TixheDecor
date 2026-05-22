package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.RefreshToken;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    public Map<String, String> login(String email, String password) {
        User user = userService.authenticate(email, password);

        String accessToken = jwtUtil.generateToken(email);
        String refreshTokenValue = jwtUtil.generateRefreshToken(email);
        refreshTokenService.issueForUser(user, refreshTokenValue);

        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshTokenValue,
                "role", userService.resolvePrimaryRole(user)
        );
    }

    public User register(String email, String password) {
        return userService.registerUser(email, password);
    }

    public Map<String, String> refresh(String refreshTokenValue) {
        RefreshToken stored = refreshTokenService.getByToken(refreshTokenValue)
                .orElseThrow(() -> new RuntimeException("Refresh token nuk u gjet"));

        if (!refreshTokenService.isValid(stored)) {
            throw new RuntimeException("Refresh token eshte i revokuar ose ka skaduar");
        }

        jwtUtil.validateToken(refreshTokenValue);
        String email = jwtUtil.extractEmail(refreshTokenValue);

        User user = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Perdoruesi nuk u gjet"));

        String newAccessToken = jwtUtil.generateToken(email);
        String newRefreshToken = jwtUtil.generateRefreshToken(email);
        refreshTokenService.issueForUser(user, newRefreshToken);

        return Map.of(
                "accessToken", newAccessToken,
                "refreshToken", newRefreshToken,
                "role", userService.resolvePrimaryRole(user)
        );
    }
}
