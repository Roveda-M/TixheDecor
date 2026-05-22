package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.UserRole;
import com.TixheDecor.backend.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;

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

    public Optional<UserRole> update(Long id, UserRole userRole) {
        if (!userRoleRepository.existsById(id)) {
            return Optional.empty();
        }
        userRole.setId(id);
        return Optional.of(userRoleRepository.save(userRole));
    }

    public boolean delete(Long id) {
        if (!userRoleRepository.existsById(id)) {
            return false;
        }
        userRoleRepository.deleteById(id);
        return true;
    }
}
