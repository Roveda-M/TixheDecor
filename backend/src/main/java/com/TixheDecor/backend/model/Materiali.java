package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(
        name = "Materiali",
        indexes = {
                @Index(name = "idx_materiali_kategoria", columnList = "kategoria"),
                @Index(name = "idx_materiali_emri", columnList = "emri")
        }
)
public class Materiali {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer materialiId;

    @ManyToOne
    @JoinColumn(name = "furnitori_id")
    private Furnitori furnitori;

    @Column(nullable = false)
    private String emri;

    @Column(columnDefinition = "TEXT")
    private String pershkrimi;

    @Column(nullable = false)
    private String njesiaMatese;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cmimiPerNjesi;

    @Column(nullable = false)
    private Integer sasiaStokut;

    @Column(nullable = false)
    private String kategoria;
    private String ngjyra;
}
