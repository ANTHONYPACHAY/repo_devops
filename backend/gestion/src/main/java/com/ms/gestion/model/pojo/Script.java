package com.ms.gestion.model.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "script")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Script {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tittle", nullable = false)
    private String tittle;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "views", nullable = false)
    private int views;

    @Column(name = "downloads", nullable = false)
    private int downloads;

    @Column(name = "valid", nullable = false)
    private boolean valid;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_register", nullable = false)
    private Date dateRegister;

    @Column(name = "estado", nullable = false)
    private char estado;
}
