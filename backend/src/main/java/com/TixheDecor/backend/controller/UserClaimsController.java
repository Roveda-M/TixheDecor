package com.TixheDecor.backend.controller;

import com.TixheDecor.backend.model.UserClaims;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-claims")
@CrossOrigin(origins = "http://localhost:3000")
public class UserClaimsController {

    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping
    public List<UserClaims> getAll() {
        return entityManager
                .createQuery("SELECT c FROM UserClaims c", UserClaims.class)
                .getResultList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserClaims> getById(@PathVariable Integer id) {
        UserClaims userClaims = entityManager.find(UserClaims.class, id);
        if (userClaims == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userClaims);
    }

    @GetMapping("/user/{userId}")
    public List<UserClaims> getByUser(@PathVariable Long userId) {
        return entityManager
                .createQuery("SELECT c FROM UserClaims c WHERE c.user.id = :userId", UserClaims.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    @PostMapping
    @Transactional
    public UserClaims create(@RequestBody UserClaims userClaims) {
        entityManager.persist(userClaims);
        return userClaims;
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<UserClaims> update(@PathVariable Integer id, @RequestBody UserClaims userClaims) {
        if (entityManager.find(UserClaims.class, id) == null) {
            return ResponseEntity.notFound().build();
        }

        userClaims.setClaimId(id);
        return ResponseEntity.ok(entityManager.merge(userClaims));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        UserClaims userClaims = entityManager.find(UserClaims.class, id);
        if (userClaims == null) {
            return ResponseEntity.notFound().build();
        }

        entityManager.remove(userClaims);
        return ResponseEntity.ok("Claim i perdoruesit u fshi me sukses!");
    }
}
