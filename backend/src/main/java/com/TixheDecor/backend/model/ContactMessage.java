package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "contact_message")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contactMessageId;

    private String name;

    private String email;

    private String phoneNumber;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String statusi = "I ri";

    private LocalDateTime createdAt = LocalDateTime.now();
}
