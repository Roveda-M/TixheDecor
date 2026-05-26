package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Pagesa")
public class Pagesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pagesaId;

    @ManyToOne
    @JoinColumn(name = "fatura_id")
    private Fatura fatura;

    @Column(precision = 10, scale = 2)
    private BigDecimal shuma;

    private LocalDate dataPageses;
    private String metoda;
    private String statusi;
}
