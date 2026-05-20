package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Furnitori")
public class Furnitori {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer furnitoriId;

    private String emri;
    private String adresa;
    private String telefoni;
    private String email;
    private String kontaktiKryesor;
    private String kushtetPageses;
    private String statusi;
    private Integer vleresimi;
}