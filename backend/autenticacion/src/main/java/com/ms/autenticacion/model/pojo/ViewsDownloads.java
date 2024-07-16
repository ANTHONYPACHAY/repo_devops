package com.ms.autenticacion.model.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "views_downloads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViewsDownloads {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "script_id", nullable = false)
    private Script script;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "estado", nullable = false)
    private char estado;
}
