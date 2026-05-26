package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Fotografia")
public class Fotografia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fotografiaId;

    @ManyToOne
    @JoinColumn(name = "projekti_id")
    private Projekti projekti;

    private String shtegu;

    @Column(columnDefinition = "TEXT")
    private String pershkrimi;

    private LocalDate dataNgarkimit;
    private String lloji;
    private Integer rendi;
}
