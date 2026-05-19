package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "UserTokens")
public class UserTokens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tokenId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String token;
    private String tokenType;
    private LocalDateTime expiresAt;
    private Boolean isRevoked;
}