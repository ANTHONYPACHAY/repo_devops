package com.ms.gestion.service;

import com.ms.gestion.model.pojo.Script;
import com.ms.gestion.repository.ScriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScriptService {

    @Autowired
    private ScriptRepository scriptRepository;

    public Script uploadScript(Script script) {
        return scriptRepository.save(script);
    }

    public List<Script> getAllScripts() {
        return scriptRepository.findAll();
    }
}
