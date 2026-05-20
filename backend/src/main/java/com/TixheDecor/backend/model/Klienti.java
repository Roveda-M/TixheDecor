package com.TixheDecor.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "Klienti")
public class Klienti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer klientiId;

    private String emri;
    private String mbiemri;
    private String email;
    private String telefoni;
    private String adresa;
    private String qyteti;
    private LocalDate dataRegjistrimit;
    private String statusi;
    private String lloji;
}
