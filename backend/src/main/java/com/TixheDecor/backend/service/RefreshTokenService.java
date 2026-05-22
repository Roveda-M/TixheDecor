package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.RefreshToken;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.RefreshTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpirationMs;

    public List<RefreshToken> getAll() {
        return refreshTokenRepository.findAll();
    }

    public Optional<RefreshToken> getById(Integer id) {
        return refreshTokenRepository.findById(id);
    }

    public Optional<RefreshToken> getByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken create(RefreshToken refreshToken) {
        if (refreshToken.getIsRevoked() == null) {
            refreshToken.setIsRevoked(false);
        }
        if (refreshToken.getCreatedAt() == null) {
            refreshToken.setCreatedAt(LocalDateTime.now());
        }
        return refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public RefreshToken issueForUser(User user, String tokenValue) {
        refreshTokenRepository.deleteByUser_Id(user.getId());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setToken(tokenValue);
        refreshToken.setExpiresAt(LocalDateTime.now().plusSeconds(refreshExpirationMs / 1000));
        refreshToken.setCreatedAt(LocalDateTime.now());
        refreshToken.setIsRevoked(false);

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> update(Integer id, RefreshToken refreshToken) {
        if (!refreshTokenRepository.existsById(id)) {
            return Optional.empty();
        }
        refreshToken.setTokenId(id);
        return Optional.of(refreshTokenRepository.save(refreshToken));
    }

    public Optional<RefreshToken> revoke(Integer id) {
        return refreshTokenRepository.findById(id)
                .map(refreshToken -> {
                    refreshToken.setIsRevoked(true);
                    return refreshTokenRepository.save(refreshToken);
                });
    }

    public boolean isValid(RefreshToken refreshToken) {
        boolean revoked = Boolean.TRUE.equals(refreshToken.getIsRevoked());
        boolean expired = refreshToken.getExpiresAt() != null
                && refreshToken.getExpiresAt().isBefore(LocalDateTime.now());
        return !revoked && !expired;
    }

    public boolean delete(Integer id) {
        if (!refreshTokenRepository.existsById(id)) {
            return false;
        }
        refreshTokenRepository.deleteById(id);
        return true;
    }

    @Transactional
    public void deleteByUserId(Long userId) {
        refreshTokenRepository.deleteByUser_Id(userId);
    }
}
