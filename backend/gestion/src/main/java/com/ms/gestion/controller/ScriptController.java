package com.ms.gestion.controller;


import com.ms.gestion.model.pojo.Script;
import com.ms.gestion.service.ScriptService;
import com.ms.gestion.util.Utilitarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @PostMapping("/uploadFile")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "recordId", required = false) String recordId) {

        try {
            // Convertir el MultipartFile a un archivo temporal
            File convFile = Utilitarios.convertMultipartFileToFile(file);

            // Llamar al método del PocketBaseService para subir el archivo

            String response = this.scriptService.uploadFile("script", recordId, convFile.getAbsolutePath());

            // Eliminar el archivo temporal después de haberlo subido
            convFile.delete();

            // Devolver la respuesta de PocketBase
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error subiendo archivo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
