package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_tokens")
public class UserToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "login_provider", nullable = false)
    private String loginProvider;

    @Column(name = "token_name", nullable = false)
    private String tokenName;

    @Column(name = "token_value", nullable = false)
    private String tokenValue;
}
