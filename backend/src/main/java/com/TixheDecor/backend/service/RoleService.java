package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleService {
    public static final Set<String> ALLOWED_ROLES = Set.of("ROLE_ADMIN", "ROLE_USER", "ROLE_WORKER");

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAll() {
        return roleRepository.findAll().stream()
                .filter(role -> ALLOWED_ROLES.contains(normalizeName(role.getEmertimi())))
                .collect(Collectors.toList());
    }

    public Optional<Role> getById(Long id) {
        return roleRepository.findById(id);
    }

    public Optional<Role> getByEmertimi(String emertimi) {
        return roleRepository.findByNormalizedName(normalizeName(emertimi));
    }

    public Role create(Role role) {
        normalizeAndValidate(role);
        return roleRepository.save(role);
    }

    public Optional<Role> update(Long id, Role role) {
        if (!roleRepository.existsById(id)) {
            return Optional.empty();
        }

        role.setId(id);
        normalizeAndValidate(role);

        return Optional.of(roleRepository.save(role));
    }

    public boolean delete(Long id) {
        if (!roleRepository.existsById(id)) {
            return false;
        }

        roleRepository.deleteById(id);
        return true;
    }

    public String normalizeName(String name) {
        if (name == null) {
            return "";
        }
        String normalized = name.trim().toUpperCase();
        if (!normalized.startsWith("ROLE_")) {
            normalized = "ROLE_" + normalized;
        }
        if ("ROLE_PUNETOR".equals(normalized) || "ROLE_PUNETORI".equals(normalized)) {
            return "ROLE_WORKER";
        }
        return normalized;
    }

    private void normalizeAndValidate(Role role) {
        String normalized = normalizeName(role.getEmertimi());
        if (!ALLOWED_ROLES.contains(normalized)) {
            throw new IllegalArgumentException("Lejohen vetem rolet: admin, user, worker.");
        }
        role.setEmertimi(normalized);
        role.setNormalizedName(normalized);
    }
}
