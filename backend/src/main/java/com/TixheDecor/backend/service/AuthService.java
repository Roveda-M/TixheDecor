package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.RefreshToken;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.model.UserTokens;
import com.TixheDecor.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private UserTokensService userTokensService;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

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

    public User register(String email, String password, String fullname, String phoneNumber) {
        return userService.registerUser(email, password, fullname, phoneNumber);
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

    public Map<String, String> forgotPassword(String email) {
        Optional<User> userOpt = userService.findByEmail(email.trim());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Email nuk ekziston në sistem!");
        }

        User user = userOpt.get();
        userTokensService.revokePasswordResetTokensForUser(user.getId());

        String token = UUID.randomUUID().toString();
        UserTokens resetToken = new UserTokens();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setTokenType("PASSWORD_RESET");
        resetToken.setExpiresAt(LocalDateTime.now().plusHours(1));
        resetToken.setIsRevoked(false);
        userTokensService.create(resetToken);

        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        return Map.of(
                "message", "Token u gjenerua me sukses!",
                "resetUrl", resetUrl
        );
    }

    public void resetPassword(String token, String newPassword) {
        if (newPassword == null || newPassword.length() < 6) {
            throw new RuntimeException("Fjalëkalimi duhet te kete te pakten 6 karaktere");
        }

        UserTokens stored = userTokensService.findValidPasswordResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token i pavlefshem ose i skaduar"));

        userService.updatePassword(stored.getUser(), newPassword);
        userTokensService.revokePasswordResetTokensForUser(stored.getUser().getId());
    }
}
