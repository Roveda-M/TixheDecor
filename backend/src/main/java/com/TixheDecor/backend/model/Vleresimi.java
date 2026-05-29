package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Vleresimi")
public class Vleresimi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer vleresimiId;

    @ManyToOne
    @JoinColumn(name = "projekti_id")
    private Projekti projekti;

    @ManyToOne
    @JoinColumn(name = "klienti_id")
    private Klienti klienti;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Integer piket;

    @Column(columnDefinition = "TEXT")
    private String komenti;

    private LocalDate dataVleresimit;

    @Column(columnDefinition = "TEXT")
    private String rekomandimi;
}
