package com.TixheDecor.backend.service;

import com.TixheDecor.backend.model.UserTokens;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserTokensService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<UserTokens> getAll() {
        return entityManager
                .createQuery("SELECT t FROM UserTokens t", UserTokens.class)
                .getResultList();
    }

    public Optional<UserTokens> getById(Integer id) {
        return Optional.ofNullable(entityManager.find(UserTokens.class, id));
    }

    public List<UserTokens> getByUser(Long userId) {
        return entityManager
                .createQuery("SELECT t FROM UserTokens t WHERE t.user.id = :userId", UserTokens.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @Transactional
    public UserTokens create(UserTokens userTokens) {
        entityManager.persist(userTokens);
        return userTokens;
    }

    @Transactional
    public Optional<UserTokens> update(Integer id, UserTokens userTokens) {
        if (entityManager.find(UserTokens.class, id) == null) {
            return Optional.empty();
        }

        userTokens.setTokenId(id);
        return Optional.of(entityManager.merge(userTokens));
    }

    @Transactional
    public Optional<UserTokens> revoke(Integer id) {
        UserTokens userTokens = entityManager.find(UserTokens.class, id);
        if (userTokens == null) {
            return Optional.empty();
        }

        userTokens.setIsRevoked(true);
        return Optional.of(entityManager.merge(userTokens));
    }

    @Transactional
    public boolean delete(Integer id) {
        UserTokens userTokens = entityManager.find(UserTokens.class, id);
        if (userTokens == null) {
            return false;
        }

        entityManager.remove(userTokens);
        return true;
    }
}
