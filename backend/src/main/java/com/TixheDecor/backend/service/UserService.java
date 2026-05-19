package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.model.User;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
}