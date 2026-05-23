package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final int MAX_FAILED_ATTEMPTS = 10;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public User create(User user) {
        user.setPasswordHash(encodePasswordIfNeeded(user.getPasswordHash()));
        if (user.getDataKrijimit() == null) {
            user.setDataKrijimit(LocalDateTime.now());
        }
        if (user.getStatusi() == null || user.getStatusi().isBlank()) {
            user.setStatusi("Aktiv");
        }
        return userRepository.save(user);
    }

    public Optional<User> update(Long id, User user) {
        return userRepository.findById(id)
                .map(existing -> {
                    user.setId(id);
                    if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
                        user.setPasswordHash(existing.getPasswordHash());
                    } else {
                        user.setPasswordHash(encodePasswordIfNeeded(user.getPasswordHash()));
                    }
                    return userRepository.save(user);
                });
    }

    public Optional<User> ndryshoStatusin(Long id, String statusi) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setStatusi(statusi);
                    return userRepository.save(user);
                });
    }

    public boolean delete(Long id) {
        if (!userRepository.existsById(id)) {
            return false;
        }
        userRepository.deleteById(id);
        return true;
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email ose fjalekalimi gabim"));

        if ("Joaktiv".equalsIgnoreCase(user.getStatusi())) {
            throw new RuntimeException("Llogaria eshte deaktivizuar");
        }

        if (user.isLockoutEnabled() && user.getAccessFailedCount() >= MAX_FAILED_ATTEMPTS) {
            throw new RuntimeException("Llogaria eshte e bllokuar pas tentativave te shumta");
        }

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            user.setAccessFailedCount(user.getAccessFailedCount() + 1);
            userRepository.save(user);
            throw new RuntimeException("Email ose fjalekalimi gabim");
        }

        user.setAccessFailedCount(0);
        return userRepository.save(user);
    }

    public User registerUser(String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email ekziston tashme");
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setStatusi("Aktiv");
        user.setDataKrijimit(LocalDateTime.now());

        Role role = roleRepository.findByEmertimi("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role ROLE_USER nuk u gjet"));
        user.getRoles().add(role);

        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String resolvePrimaryRole(User user) {
        return user.getRoles().stream()
                .map(Role::getEmertimi)
                .collect(Collectors.joining(","));
    }

    public void updatePassword(User user, String newPassword) {
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setAccessFailedCount(0);
        userRepository.save(user);
    }

    private String encodePasswordIfNeeded(String password) {
        if (password == null || password.isBlank()) {
            return password;
        }
        if (password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$")) {
            return password;
        }
        return passwordEncoder.encode(password);
    }
}
