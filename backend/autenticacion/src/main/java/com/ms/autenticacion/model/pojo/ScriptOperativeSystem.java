package com.ms.autenticacion.model.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "script_operative_system")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScriptOperativeSystem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "script_id", nullable = false)
    private Script script;

    @ManyToOne
    @JoinColumn(name = "operative_system_id", nullable = false)
    private OperativeSystem operativeSystem;

    @Column(name = "estado", nullable = false)
    private char estado;
}
