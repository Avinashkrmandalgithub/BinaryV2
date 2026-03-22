package com.mainServer.main_server.utils;

import com.mainServer.main_server.config.UrlConfig;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class UploadInRAG {
    private final UrlConfig urlConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    public UploadInRAG(UrlConfig urlConfig) {
        this.urlConfig = urlConfig;
    }

    public Map<String, Object> uploadFileInRAG(MultipartFile file, String userId) {
        try{
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            body.add("file", new ByteArrayResource(file.getBytes()){
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            });

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String urlWithParams = urlConfig.getRagServerUrl() + "/document/uploads" + "?user_id=" + userId;
            System.out.println("Sending file upload request to RAG server at: " + urlWithParams);
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    urlWithParams,
                    requestEntity,
                    Map.class
            );

            if(response.getBody() == null){
                return Map.of("error", "Failed to upload file: Empty response from utility server");
            }

            System.out.println("Response from RAG server: " + response.getBody());
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Map<String, Object> uploadURLInRAG(String url, String userId){
        try{
            Map<String, Object> body = new HashMap<>();
            body.put("user_id", userId);
            body.put("url", url);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String urlWithParams = urlConfig.getRagServerUrl() + "/document/url";
            System.out.println("Querying RAG server at: " + urlWithParams);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    urlWithParams,
                    requestEntity,
                    Map.class
            );

            if (response.getBody() == null) {
                throw new RuntimeException("Failed to query RAG: Empty response from RAG server");
            }

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}