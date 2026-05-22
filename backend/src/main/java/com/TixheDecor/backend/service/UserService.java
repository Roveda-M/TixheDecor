package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

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

    public boolean validateLogin(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) return false;
        return passwordEncoder.matches(password, user.get().getPasswordHash());
    }

    public User registerUser(String email, String password) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));

        Role role = roleRepository.findByEmertimi("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Role nuk u gjet"));
        user.getRoles().add(role);

        return userRepository.save(user);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
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
