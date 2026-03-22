package com.mainServer.main_server.controller;

import com.mainServer.main_server.dto.request.DocumentDataRequestDto;
import com.mainServer.main_server.dto.request.URLRequestDto;
import com.mainServer.main_server.service.DocumentDataService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/uploadData")
@AllArgsConstructor
public class DocumentDataController {

    private final DocumentDataService documentDataService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Map<String, Object>> uploadDocumentData(@Valid @ModelAttribute DocumentDataRequestDto dataRequestDto) throws IOException {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(documentDataService.uploadDocumentData(dataRequestDto));
    }

    @PostMapping("/upload-web-url")
    public ResponseEntity<Map<String, Object>> uploadWebURL(@RequestBody URLRequestDto webURLRequest) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(documentDataService.uploadWebURL(webURLRequest));

    }
}
