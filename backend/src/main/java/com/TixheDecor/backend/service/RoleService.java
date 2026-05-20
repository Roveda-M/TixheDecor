package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.Role;
import com.TixheDecor.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    public Optional<Role> getById(Long id) {
        return roleRepository.findById(id);
    }

    public Optional<Role> getByEmertimi(String emertimi) {
        return roleRepository.findByEmertimi(emertimi);
    }

    public Role create(Role role) {
        if (role.getNormalizedName() == null && role.getEmertimi() != null) {
            role.setNormalizedName(role.getEmertimi().toUpperCase());
        }

        return roleRepository.save(role);
    }

    public Optional<Role> update(Long id, Role role) {
        if (!roleRepository.existsById(id)) {
            return Optional.empty();
        }

        role.setId(id);
        if (role.getNormalizedName() == null && role.getEmertimi() != null) {
            role.setNormalizedName(role.getEmertimi().toUpperCase());
        }

        return Optional.of(roleRepository.save(role));
    }

    public boolean delete(Long id) {
        if (!roleRepository.existsById(id)) {
            return false;
        }

        roleRepository.deleteById(id);
        return true;
    }
}
