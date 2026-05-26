package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Punetori")
public class Punetori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer punetoriId;

    private String emri;
    private String mbiemri;
    private String pozita;
    private String specializimi;
    private String telefoni;
    private String email;

    @Column(precision = 10, scale = 2)
    private BigDecimal paga;

    private LocalDate dataPunesimit;
    private String statusi;
}
