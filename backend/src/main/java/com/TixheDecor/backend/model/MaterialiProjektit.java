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
    private BigDecimal cmimiTotal;
    private LocalDate dataPerdorimit;
    private String shenime;
}