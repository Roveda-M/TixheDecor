package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "Materiali_Projektit")
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

    private Integer sasia;

    @Column(precision = 10, scale = 2)
    private BigDecimal cmimiTotal;

    private LocalDate dataPerdorimit;

    @Column(columnDefinition = "TEXT")
    private String shenime;
}
