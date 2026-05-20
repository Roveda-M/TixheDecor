package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.UserClaims;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserClaimsService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<UserClaims> getAll() {
        return entityManager
                .createQuery("SELECT c FROM UserClaims c", UserClaims.class)
                .getResultList();
    }

    public Optional<UserClaims> getById(Integer id) {
        return Optional.ofNullable(entityManager.find(UserClaims.class, id));
    }

    public List<UserClaims> getByUser(Long userId) {
        return entityManager
                .createQuery("SELECT c FROM UserClaims c WHERE c.user.id = :userId", UserClaims.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Transactional
    public UserClaims create(UserClaims userClaims) {
        entityManager.persist(userClaims);
        return userClaims;
    }

    @Transactional
    public Optional<UserClaims> update(Integer id, UserClaims userClaims) {
        if (entityManager.find(UserClaims.class, id) == null) {
            return Optional.empty();
        }

        userClaims.setClaimId(id);
        return Optional.of(entityManager.merge(userClaims));
    }

    @Transactional
    public boolean delete(Integer id) {
        UserClaims userClaims = entityManager.find(UserClaims.class, id);
        if (userClaims == null) {
            return false;
        }

        entityManager.remove(userClaims);
        return true;
    }
}
