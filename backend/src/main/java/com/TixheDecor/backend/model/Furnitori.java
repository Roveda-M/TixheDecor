package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "Furnitori",
        indexes = {
                @Index(name = "idx_furnitori_statusi", columnList = "statusi"),
                @Index(name = "idx_furnitori_email", columnList = "email")
        }
)
public class Furnitori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer furnitoriId;

    @Column(nullable = false)
    private String emri;
    private String adresa;
    private String telefoni;
    private String email;
    @Column(nullable = false)
    private String kontaktiKryesor;
    @Column(nullable = false)
    private String kushtetPageses;
    private String statusi;
    @Column(nullable = false)
    private Integer vleresimi;
}
