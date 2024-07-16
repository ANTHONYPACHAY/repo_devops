package com.ms.gestion.controller;


import com.ms.gestion.model.pojo.Script;
import com.ms.gestion.service.ScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/scripts")
public class ScriptController {

    @Autowired
    private ScriptService scriptService;

    @PostMapping("/upload")
    public Script uploadScript(@RequestBody Script script) {
        return scriptService.uploadScript(script);
    }

    @GetMapping
    public List<Script> getAllScripts() {
        return scriptService.getAllScripts();
    }
}
