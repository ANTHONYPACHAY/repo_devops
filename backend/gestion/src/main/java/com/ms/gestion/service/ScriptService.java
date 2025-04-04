package com.ms.gestion.service;

import com.ms.gestion.model.dto.CustomResponse;
import com.ms.gestion.model.pojo.Script;
import com.ms.gestion.repository.ScriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.File;
import java.util.List;

@Service
public class ScriptService {

    @Autowired
    private ScriptRepository scriptRepository;

    @Autowired
    private PocketBaseService pocketBaseService;

    public Script uploadScript(Script script) {
        return scriptRepository.save(script);
    }

    public List<Script> getAllScripts() {
        return scriptRepository.findAll();
    }

    public String uploadFile(String collectionName, String recordId, String filePath) throws Exception {
        File file = new File(filePath);
        // Validar que el archivo exista
        if (!file.exists() || !file.isFile()) {
            throw new IllegalArgumentException("El archivo especificado no existe o no es un archivo válido.");
        }

        // Preparar el cuerpo de la solicitud para enviar el archivo
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("documento", new FileSystemResource(file));  // Archivo a enviar

        String token = this.pocketBaseService.obtenerToken();
        CustomResponse<String> response;
        if (recordId == null || recordId.isEmpty()) {
            // Si no hay recordId, creamos un nuevo registro
            response = this.pocketBaseService.createRecordFile(collectionName, body, token, null);
        } else {
            // Si hay recordId, actualizamos el registro existente
            response = this.pocketBaseService.updateRecordFile(collectionName, body, token, recordId);
        }



        // Verificar la respuesta
        if (response.getStatus() == 2) {
            return response.getData(); // Retornar el cuerpo de la respuesta
        } else {
            throw new RuntimeException("Error al subir el archivo: " + response.getMessage());
        }
    }
}
