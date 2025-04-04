package com.ms.gestion.util;

import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class Utilitarios {

    public static <T, D> D convertEntityToDto(T entity, Class<D> dtoClass) {
        ModelMapper modelMapper = new ModelMapper();
        D dto = modelMapper.map(entity, dtoClass);
        return dto;
    }

    public static File convertMultipartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }
}
