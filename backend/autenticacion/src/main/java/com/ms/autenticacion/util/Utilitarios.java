package com.ms.autenticacion.util;

import org.modelmapper.ModelMapper;

public class Utilitarios {

    public static <T, D> D convertEntityToDto(T entity, Class<D> dtoClass) {
        ModelMapper modelMapper = new ModelMapper();
        D dto = modelMapper.map(entity, dtoClass);
        return dto;
    }
}
