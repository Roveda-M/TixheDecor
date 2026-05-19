package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Materiali")
public class Materiali {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer materialiId;

    @ManyToOne
    @JoinColumn(name = "furnitori_id")
    private Furnitori furnitori;

    private String emri;
    private String pershkrimi;
    private String njesiaMatese;
    private BigDecimal cmimiPerNjesi;
    private Integer sasiaStokut;
    private String kategoria;
    private String ngjyra;
}