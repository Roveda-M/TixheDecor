package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "UserClaims")
public class UserClaims {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer claimId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String claimType;
    private String claimValue;
}