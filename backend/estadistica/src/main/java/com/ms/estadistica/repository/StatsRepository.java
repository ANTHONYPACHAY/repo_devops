package com.ms.estadistica.repository;

import com.ms.estadistica.model.pojo.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface StatsRepository extends JpaRepository<Script, Long> {

    @Query(value = "SELECT * FROM obtener_estadisticas()", nativeQuery = true)
    public List<Map<String, Object>> getStats();
}
