package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(
        name = "materiali_projektit",
        indexes = {
                @Index(name = "idx_materiali_projektit_perdorimit", columnList = "data_perdorimit")
        }
)
public class MaterialiProjektit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mpId;

    @ManyToOne
    @JoinColumn(name = "projekti_id")
    private Projekti projekti;

    @ManyToOne
    @JoinColumn(name = "materiali_id")
    private Materiali materiali;

    @Column(nullable = false)
    private Integer sasia;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal cmimiTotal;

    private LocalDate dataPerdorimit;

    @Column(columnDefinition = "TEXT")
    private String shenime;
}
