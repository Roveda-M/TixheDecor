package com.TixheDecor.backend.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "bride_to_be_request")
public class BrideToBeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestId;

    private String brideName;
    private LocalDate eventDate;
    private LocalTime eventTime;

    @JsonAlias({"adresa", "address", "lokacioni"})
    private String location;

    @JsonAlias({"phone", "phoneNumber"})
    @Column(name = "telefoni")
    private String telefoni;

    private String email;

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
            statusi = "I filluar";
        }
    }
}
