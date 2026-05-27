package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.UserRole;
import com.TixheDecor.backend.repository.RoleRepository;
import com.TixheDecor.backend.repository.UserRepository;
import com.TixheDecor.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleService roleService;

    public List<UserRole> getAll() {
        return userRoleRepository.findAll();
    }

    public Optional<UserRole> getById(Long id) {
        return userRoleRepository.findById(id);
    }

    public List<UserRole> getByUser(Long userId) {
        return userRoleRepository.findByUserId(userId);
    }

    public UserRole create(UserRole userRole) {
        return userRoleRepository.save(userRole);
    }

    public UserRole createByNames(Map<String, String> request) {
        return userRoleRepository.save(resolveUserRole(new UserRole(), request));
    }

    public Optional<UserRole> update(Long id, UserRole userRole) {
        if (!userRoleRepository.existsById(id)) {
            return Optional.empty();
        }
        userRole.setId(id);
        return Optional.of(userRoleRepository.save(userRole));
    }

    public Optional<UserRole> updateByNames(Long id, Map<String, String> request) {
        return userRoleRepository.findById(id)
                .map(existing -> userRoleRepository.save(resolveUserRole(existing, request)));
    }

    public boolean delete(Long id) {
        if (!userRoleRepository.existsById(id)) {
            return false;
        }
        userRoleRepository.deleteById(id);
        return true;
    }

    private UserRole resolveUserRole(UserRole userRole, Map<String, String> request) {
        String userValue = firstNonBlank(request.get("userEmail"), request.get("userName"), request.get("user"));
        String roleValue = firstNonBlank(request.get("roleName"), request.get("role"));

        if (userValue == null || roleValue == null) {
            throw new IllegalArgumentException("Shkruaj perdoruesin dhe rolin.");
        }

        String normalizedRole = roleService.normalizeName(roleValue);
        if (!RoleService.ALLOWED_ROLES.contains(normalizedRole)) {
            throw new IllegalArgumentException("Lejohen vetem rolet: admin, user, worker.");
        }

        userRole.setUser(userRepository.findByEmail(userValue.trim())
                .or(() -> userRepository.findAll().stream()
                        .filter(user -> userValue.equalsIgnoreCase(user.getEmri())
                                || userValue.equalsIgnoreCase(user.getFullname()))
                        .findFirst())
                .orElseThrow(() -> new RuntimeException("Perdoruesi nuk u gjet.")));
        userRole.setRole(roleRepository.findByNormalizedName(normalizedRole)
                .orElseThrow(() -> new RuntimeException("Roli nuk u gjet.")));
        return userRole;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value.trim();
            }
        }
        return null;
    }
}
