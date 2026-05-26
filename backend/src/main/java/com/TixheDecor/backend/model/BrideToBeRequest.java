package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "Bride_To_Be_Request")
public class BrideToBeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestId;

    private String brideName;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String location;

    @Column(length = 2000)
    private String selectedDecors;

    private String statusi;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "punetori_id")
    private Punetori punetori;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (statusi == null || statusi.isBlank()) {
            statusi = "PENDING";
        }
    }
}
