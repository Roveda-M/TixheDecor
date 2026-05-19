package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Projekti")
public class Projekti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer projektiId;

    @ManyToOne
    @JoinColumn(name = "klienti_id")
    private Klienti klienti;

    private String emriProjektit;
    private String pershkrimi;
    private LocalDate dataFillimit;
    private LocalDate dataPerfundimit;
    private BigDecimal buxheti;
    private String statusi;
    private String llojiDekorimit;
    private String lokacioni;
}