package com.ms.autenticacion.model.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "script_script_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScriptScriptType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "script_id", nullable = false)
    private Script script;

    @ManyToOne
    @JoinColumn(name = "script_type_id", nullable = false)
    private ScriptType scriptType;

    @Column(name = "estado", nullable = false)
    private char estado;
}
