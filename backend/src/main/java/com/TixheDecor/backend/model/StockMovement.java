package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "StockMovement")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer movementId;

    @ManyToOne
    @JoinColumn(name = "materiali_id")
    private Materiali materiali;

    private String tipi;
    private Integer sasia;
    private LocalDate data;

    @Column(columnDefinition = "TEXT")
    private String pershkrimi;
}
