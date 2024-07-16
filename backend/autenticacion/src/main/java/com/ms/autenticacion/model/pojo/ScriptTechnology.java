package com.ms.autenticacion.model.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "script_tecnology")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScriptTechnology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "script_id", nullable = false)
    private Script script;

    @ManyToOne
    @JoinColumn(name = "tecnology_id", nullable = false)
    private Technology technology;

    @Column(name = "estado", nullable = false)
    private char estado;
}
