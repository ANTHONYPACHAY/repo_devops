package com.ms.gestion.util;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ms.gestion.model.dto.CustomResponse;
import org.springframework.http.*;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.util.Objects;

public class ManagerREST {

    public enum Methods {
        GET, POST, PUT, DELETE, PATCH
    }

    public enum ContentType {

        JSON(MediaType.APPLICATION_JSON_VALUE),
        JSON_UTF8(MediaType.APPLICATION_JSON_UTF8_VALUE),
        XML_UTF8(MediaType.APPLICATION_XML_VALUE),
        FORM_ENCODED(MediaType.APPLICATION_FORM_URLENCODED_VALUE),
        MULTIPART_FORM_DATA(MediaType.MULTIPART_FORM_DATA_VALUE);
        private final String value;

        // Constructor
        ContentType(String value) {
            this.value = value;
        }

        // Getter manual
        public String getValue() {
            return value;
        }
    }

    public static CustomResponse<String> consumeWebService(String method,
                                                           String contentType,
                                                           String urlService,
                                                           String body) {
        CustomResponse<String> resp = new CustomResponse<>(4, "Ocurrió un problema", "");
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlService);
            conn = (HttpURLConnection) url.openConnection();
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setReadTimeout(300000);
            conn.setConnectTimeout(300000);
            conn.setRequestMethod(method);
            conn.setRequestProperty("Content-Type", "application/json");

            DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
            wr.write(body.getBytes("UTF-8"));
            wr.flush();
            wr.close();

            if (conn.getResponseCode() == conn.HTTP_OK) {
                StringBuilder responseStrBuilder = new StringBuilder();
                InputStream in = new BufferedInputStream(conn.getInputStream());
                BufferedReader streamReader = new BufferedReader(new InputStreamReader(in, "UTF-8"));
                String inputStr;
                while ((inputStr = streamReader.readLine()) != null) {
                    responseStrBuilder.append(inputStr);
                }
                System.out.println("Respuesta: " + responseStrBuilder.toString());
                String dataResponse = responseStrBuilder.toString();
                resp.setStatus(2);
                resp.setMessage("Información recuperada con éxito");
                resp.setData(dataResponse);
            }
            conn.disconnect();
        } catch (Exception e) {
            System.out.println("ERROR.ManagerREST.consumeWebService(): " + e.getMessage());
            resp.setMessage(e.getMessage());
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return resp;
    }


    public static Map<String, Object> parseJson(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("Error al parsear el JSON", e);
        }
    }

    public static List<Map<String, Object>> parseJsonArray(String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(json, new TypeReference<List<Map<String, Object>>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("Error al parsear el JSON", e);
        }
    }
    public static <T> String writeValueAsString(List<T> json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(json);
        } catch (Exception e) {
            throw new RuntimeException("Error al parsear el JSON", e);
        }
    }


    public static <T> CustomResponse<String> consumeREST(String method,
                                                         String contentType,
                                                         String urlService,
                                                         T body, MultiValueMap<String, String> opHaders) {
        CustomResponse<String> resp = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            // Crear instancia de RestTemplate
            RestTemplate restTemplate = new RestTemplate();

            // Configurar los headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf(contentType));
            // headers.setBearerAuth(token);
            if (opHaders != null) {
                headers.addAll(opHaders);
            }

            // Crear el cuerpo de la petición genérica
            HttpEntity<T> request = new HttpEntity<>(body, headers);
            ResponseEntity<String> response;

            if (method.equalsIgnoreCase(HttpMethod.GET.name())) {
                response = restTemplate.exchange(urlService, HttpMethod.GET, request, String.class);
            } else if (method.equalsIgnoreCase(HttpMethod.POST.name())) {
                response = restTemplate.postForEntity(urlService, request, String.class);
            } else if (method.equalsIgnoreCase(HttpMethod.PUT.name())) {
                restTemplate.put(urlService, request);
                response = new ResponseEntity<>("", HttpStatus.OK); // PUT no devuelve respuesta por defecto
            } else if (method.equalsIgnoreCase(HttpMethod.DELETE.name())) {
                response = restTemplate.exchange(urlService, HttpMethod.DELETE, request, String.class);
            } else if (method.equalsIgnoreCase(HttpMethod.PATCH.name())) {
                response = restTemplate.exchange(urlService, HttpMethod.PATCH, request, String.class);
            } else {
                throw new IllegalArgumentException("Método HTTP no soportado: " + method);
            }

            resp.setContenType(ManagerREST.getMediaTypeFromResponse(response));
            // Verificar el estado de la respuesta
            if (response != null && response.getStatusCode().is2xxSuccessful()) {
                String dataResponse = response.getBody();
                resp.setStatus(2);
                resp.setMessage("Información recuperada con éxito");
                resp.setData(dataResponse);
            }
        } catch (Exception e) {
            System.out.println("ERROR.ManagerREST.consumeWebService(): " + e.getMessage());
            resp.setMessage(e.getMessage());
        }
        return resp;
    }

    // Método para obtener el archivo como Resource
    public static CustomResponse<Resource> downloadFile(String fileUrl) {

        CustomResponse<Resource> resp = new CustomResponse<>(4, "Ocurrió un problema", null);
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<Resource> response = restTemplate.getForEntity(new URI(fileUrl), Resource.class);

            resp.setContenType(ManagerREST.getMediaTypeFromResponse(response));
            if (response.getStatusCode().is2xxSuccessful()) {
                Resource fileResource = response.getBody();
                if (fileResource != null && fileResource.exists()) {
                    resp.setStatus(2);
                    resp.setMessage("Información recuperada con éxito");
                    resp.setData(fileResource);
                }
            }
        } catch (Exception e) {
            System.out.println("ERROR.ManagerREST.downloadFile(): " + e.getMessage());
            resp.setMessage(e.getMessage());
        }
        return resp;
    }

    public static <T> MediaType getMediaTypeFromResponse(ResponseEntity<T> response) {
        return response.getHeaders().getContentType() != null ?
                response.getHeaders().getContentType() :
                MediaType.APPLICATION_OCTET_STREAM;
    }

}
