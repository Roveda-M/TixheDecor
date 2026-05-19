package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emri;
    private String mbiemri;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email_confirmed")
    private boolean emailConfirmed = false;

    @Column(name = "lockout_enabled")
    private boolean lockoutEnabled = true;

    @Column(name = "access_failed_count")
    private int accessFailedCount = 0;

    @Column(name = "data_krijimit")
    private LocalDateTime dataKrijimit = LocalDateTime.now();

    private String statusi;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}