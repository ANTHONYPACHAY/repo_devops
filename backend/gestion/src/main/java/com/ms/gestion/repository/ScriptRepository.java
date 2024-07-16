package com.ms.gestion.repository;

import com.ms.gestion.model.pojo.Script;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScriptRepository extends JpaRepository<Script, Long> {
}
