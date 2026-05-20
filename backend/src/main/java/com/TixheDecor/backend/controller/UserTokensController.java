package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserTokens;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-tokens")
@CrossOrigin(origins = "http://localhost:3000")
public class UserTokensController {
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping
    public List<UserTokens> getAll() {
        return entityManager
                .createQuery("SELECT t FROM UserTokens t", UserTokens.class)
                .getResultList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTokens> getById(@PathVariable Integer id) {
        UserTokens userTokens = entityManager.find(UserTokens.class, id);
        if (userTokens == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userTokens);
    }

    @GetMapping("/user/{userId}")
    public List<UserTokens> getByUser(@PathVariable Long userId) {
        return entityManager
                .createQuery("SELECT t FROM UserTokens t WHERE t.user.id = :userId", UserTokens.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @PostMapping
    @Transactional
    public UserTokens create(@RequestBody UserTokens userTokens) {
        entityManager.persist(userTokens);
        return userTokens;
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<UserTokens> update(@PathVariable Integer id, @RequestBody UserTokens userTokens) {
        if (entityManager.find(UserTokens.class, id) == null) {
            return ResponseEntity.notFound().build();
        }

        userTokens.setTokenId(id);
        return ResponseEntity.ok(entityManager.merge(userTokens));
    }

    @PatchMapping("/{id}/revoko")
    @Transactional
    public ResponseEntity<UserTokens> revoke(@PathVariable Integer id) {
        UserTokens userTokens = entityManager.find(UserTokens.class, id);
        if (userTokens == null) {
            return ResponseEntity.notFound().build();
        }

        userTokens.setIsRevoked(true);
        return ResponseEntity.ok(entityManager.merge(userTokens));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        UserTokens userTokens = entityManager.find(UserTokens.class, id);
        if (userTokens == null) {
            return ResponseEntity.notFound().build();
        }

        entityManager.remove(userTokens);
        return ResponseEntity.ok("Token i perdoruesit u fshi me sukses!");
    }
}
