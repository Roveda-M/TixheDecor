package com.TixheDecor.backend.service;

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

    public Map<String, String> login(String email, String password) {
        if (!userService.validateLogin(email, password)) {
            throw new RuntimeException("Email ose fjalekalimi gabim");
        }

        return Map.of(
                "accessToken", jwtUtil.generateToken(email),
                "refreshToken", jwtUtil.generateRefreshToken(email)
        );
    }

    public User register(String email, String password) {
        return userService.registerUser(email, password);
    }

    public Map<String, String> refresh(String refreshToken) {
        String email = jwtUtil.extractEmail(refreshToken);
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new RuntimeException("Refresh token invalid");
        }

        return Map.of("accessToken", jwtUtil.generateToken(email));
    }
}
