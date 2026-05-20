package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Fatura")
public class Fatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer faturaId;

    @ManyToOne
    @JoinColumn(name = "projekti_id")
    private Projekti projekti;

    @ManyToOne
    @JoinColumn(name = "klienti_id")
    private Klienti klienti;

    private BigDecimal shumaTotale;
    private LocalDate dataFatures;
    private LocalDate dataPageses;
    private String statusi;
    private String metodaPageses;
    private String nrFatures;
}