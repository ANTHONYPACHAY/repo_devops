package com.ms.gestion.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ms.gestion.model.dto.CustomResponse;
import com.ms.gestion.util.ManagerREST;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.http.HttpClient;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@Service
public class PocketBaseService {


    public final String urlServer = "http://192.168.40.100:8090";
    private final String email = "anthonypachay@gmail.com"; // Cambia por tu email
    private final String password = "P0ck3tS3rv3r";
    private final HttpClient httpClient;

    public PocketBaseService() {
        this.httpClient = HttpClient.newHttpClient();
    }

    //region [auth]

    public String userAuth(String username, String password) {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("identity", username);
        params.put("password", password);

        String urlString = String.format("%s/api/collections/users/auth-with-password", urlServer);
        CustomResponse<String> resp = ManagerREST.consumeREST(ManagerREST.Methods.POST.name(),
                ManagerREST.ContentType.JSON.getValue(), urlString, params, null);

        Map<String, Object> dataLoginResponse= ManagerREST.parseJson(resp.getData());
        return (String) dataLoginResponse.get("token");
    }


    public String obtenerToken() {
        try {
            // Crear las credenciales
            Map<String, String> credenciales = new HashMap<>();
            credenciales.put("identity", email);
            credenciales.put("password", password);

            // Convertir credenciales a JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String credencialesJson = objectMapper.writeValueAsString(credenciales);

            String urlString = String.format("%s/api/admins/auth-with-password", urlServer);
            CustomResponse<String> response = ManagerREST.consumeREST(ManagerREST.Methods.POST.name(),
                    ManagerREST.ContentType.JSON.getValue(), urlString, credenciales, null);

            // Parsear la respuesta JSON
            JsonNode rootNode = objectMapper.readTree(response.getData());

            // Obtener el token de la respuesta
            if (rootNode.has("token")) {
                return rootNode.get("token").asText();
            } else {
                throw new RuntimeException("No se encontró el token en la respuesta.");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    //region

    //region [Record]
    public CustomResponse<String> createRecord(String collectionName, Map<String, Object> recordData, String token) {
        CustomResponse<String> result = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            // Construir la URL del servicio
            String url = String.format("%s/api/collections/%s/records", urlServer, collectionName);

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("Authorization", "Bearer " + token);

            result = ManagerREST.consumeREST(ManagerREST.Methods.POST.name(),
                    ManagerREST.ContentType.JSON.getValue(),
                    url, recordData, params);

        } catch (Exception e) {
            System.out.println("Error al crear el registro: " + e.getMessage());
        }
        return result;
    }

    public CustomResponse<String> createOrUpdateRecord(String collectionName, MultiValueMap<String, Object> recordData, String token, String recordId) {
        CustomResponse<String> result = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            String method;
            String url;

            // Si existe un recordId, hacemos una actualización (PATCH), de lo contrario, creamos un nuevo registro (POST)
            if (recordId != null && !recordId.isEmpty()) {
                method = ManagerREST.Methods.PATCH.name();
                url = String.format("%s/api/collections/%s/records/%s", urlServer, collectionName, recordId); // Actualización
            } else {
                method = ManagerREST.Methods.POST.name();
                url = String.format("%s/api/collections/%s/records", urlServer, collectionName); // Creación
            }

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("Authorization", "Bearer " + token);

            result = ManagerREST.consumeREST(method,
                    ManagerREST.ContentType.JSON.getValue(),
                    url, recordData, params);

        } catch (Exception e) {
            System.out.println("Error al crear o actualizar el registro: " + e.getMessage());
        }
        return result;
    }

    public CustomResponse<String> createRecordFile(String collectionName, MultiValueMap<String, Object> recordData, String token, String recordId) {
        CustomResponse<String> result = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            // Construir la URL del servicio
            String url = String.format("%s/api/collections/%s/records%s",
                    urlServer,
                    collectionName,
                    (recordId != null && !recordId.isEmpty()) ? ("/" + recordId) : "");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("Authorization", "Bearer " + token);

            result = ManagerREST.consumeREST(ManagerREST.Methods.POST.name(),
                    ManagerREST.ContentType.MULTIPART_FORM_DATA.getValue(),
                    url, recordData, params);
        } catch (Exception e) {
            System.out.println("Error al crear el registro: " + e.getMessage());
        }
        return result;
    }


    public CustomResponse<String> updateRecordFile(String collectionName,
                                                   MultiValueMap<String, Object> recordData,
                                                   String token,
                                                   String recordId) {
        CustomResponse<String> result = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            // Verifica que el recordId no esté vacío, ya que se necesita para actualizar
            if (recordId == null || recordId.isEmpty()) {
                throw new IllegalArgumentException("El ID del registro es obligatorio para actualizar.");
            }

            // Construir la URL del servicio para actualizar un documento existente
            String url = String.format("%s/api/collections/%s/records/%s",
                    urlServer,
                    collectionName,
                    recordId);

            // Agregar el token de autorización en los headers
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("Authorization", "Bearer " + token);

            // Llamar al metodo consumeREST utilizando el metodo PATCH
            result = ManagerREST.consumeREST(ManagerREST.Methods.PATCH.name(),
                    ManagerREST.ContentType.MULTIPART_FORM_DATA.getValue(),
                    url, recordData, params);

        } catch (Exception e) {
            System.out.println("Error al actualizar el registro: " + e.getMessage());
            result.setMessage(e.getMessage());
        }
        return result;
    }



    public CustomResponse<String> ListRecords(String collectionName, String token, String queryParams) {
        CustomResponse<String> result = new CustomResponse<>(4, "Ocurrió un problema", "");
        try {
            // Construir la URL del servicio
            String url = String.format("%s/api/collections/%s/records%s", urlServer, collectionName, queryParams != null ? queryParams : "");

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("Authorization", "Bearer " + token);

            result = ManagerREST.consumeREST(ManagerREST.Methods.GET.name(),
                    ManagerREST.ContentType.JSON.getValue(),
                    url, "", params);

        } catch (Exception e) {
            System.out.println("Error al crear el registro: " + e.getMessage());
        }
        return result;
    }





    //region

    // 
    private String extractRecordId(String jsonResponse, String attributo) {
        Map<String, Object> responseMap = ManagerREST.parseJson(jsonResponse);
        return (String) responseMap.get(attributo);
    }

    public String makeUrlResource(String collectionId, String recordId, String document){
        return String.format("/api/files/%s/%s/%s?token=", collectionId, recordId, document);
    }
    public CustomResponse<Resource> downloadFile(String fileUrl, boolean isRelative) {
        if(isRelative) {
            fileUrl = this.urlServer + fileUrl;
        }
        return ManagerREST.downloadFile(fileUrl);
    }

    public String buildQueryParams(String collection, List<String> expand, Integer page, Integer perPage, Map<String, String> filter, List<String> fields) {
        StringBuilder queryParams = new StringBuilder();

        // Construir el parámetro expand si la lista no está vacía
        if (!expand.isEmpty()) {
            queryParams.append("expand=");
            StringJoiner expandJoiner = new StringJoiner(",");
            for (String exp : expand) {
                expandJoiner.add(exp);
            }
            queryParams.append(expandJoiner.toString()).append("&");
        }


        if (page != null && perPage != null) {
            queryParams.append("page=").append(page).append("&perPage=").append(perPage).append("&");
        }

        // Construir el filtro
        if (!filter.isEmpty()) {
            queryParams.append("filter=(");
            StringJoiner filterJoiner = new StringJoiner(" && ");
            for (Map.Entry<String, String> entry : filter.entrySet()) {
                filterJoiner.add(entry.getKey() + "='" + entry.getValue() + "'");
            }
            queryParams.append(filterJoiner.toString()).append(")&");
        }

        // Añadir los campos
        if (!fields.isEmpty()) {
            queryParams.append("fields=");
            StringJoiner fieldsJoiner = new StringJoiner(",");
            for (String field : fields) {
                fieldsJoiner.add(field);
            }
            queryParams.append(fieldsJoiner.toString()).append("&");
        }

        // Eliminar el último & si existe
        if (queryParams.length() > 0 && queryParams.charAt(queryParams.length() - 1) == '&') {
            queryParams.deleteCharAt(queryParams.length() - 1);
        }

        // Si hay parámetros, agregar el '?'
        if (queryParams.length() > 0) {
            return "?" + queryParams.toString();
        }

        return "";
    }

}
