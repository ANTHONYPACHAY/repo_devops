package com.ms.gestion.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.MediaType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomResponse<T> {
    private Integer status; // 2 = todo bien; 3 = algún problema, 4 = un Error
    private String message; // contenido a comunicar
    private T data; // información a transmitir :D
    private MediaType contenType; // tipo de contenido, opcional

    public CustomResponse(Integer status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.contenType = null;
    }

    public CustomResponse(CustomResponse<String> oldResponse) {
        this.status = oldResponse.getStatus();
        this.message = oldResponse.getMessage();
        this.contenType = oldResponse.getContenType();
    }
}
