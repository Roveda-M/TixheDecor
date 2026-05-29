package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "projekti")
public class Projekti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projektiId;

    @ManyToOne
    @JoinColumn(name = "klienti_id")
    private Klienti klienti;

    private String emriProjektit;

    @Column(columnDefinition = "TEXT")
    private String pershkrimi;

    private LocalDate dataFillimit;
    private LocalDate dataPerfundimit;
    @Column(name = "ora_eventit")
    private LocalTime oraEventit;

    @Column(precision = 10, scale = 2)
    private BigDecimal buxheti;

    @Column(precision = 10, scale = 2)
    private BigDecimal kapari;

    private String statusi;
    private String llojiDekorimit;
    private String lokacioni;
}
