package com.mainServer.main_server.service;

import com.mainServer.main_server.dto.request.DocumentDataRequestDto;
import com.mainServer.main_server.dto.request.URLRequestDto;
import jakarta.validation.Valid;
import org.jspecify.annotations.Nullable;

import java.io.IOException;
import java.util.Map;

public interface DocumentDataService {

    Map<String, Object> uploadDocumentData(@Valid DocumentDataRequestDto dataRequestDto) throws IOException;

    Map<String, Object> uploadWebURL(URLRequestDto webURLRequest);
}
