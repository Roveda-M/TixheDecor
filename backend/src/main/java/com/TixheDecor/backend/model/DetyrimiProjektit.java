package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Detyrimi_Projektit")
public class DetyrimiProjektit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detyrimiId;

    @ManyToOne
    @JoinColumn(name = "projekti_id")
    private Projekti projekti;

    @ManyToOne
    @JoinColumn(name = "punetori_id")
    private Punetori punetori;

    private String pershkrimi;
    private LocalDate dataFillimit;
    private LocalDate dataPerfundimit;
    private String statusi;
    private String prioriteti;
}