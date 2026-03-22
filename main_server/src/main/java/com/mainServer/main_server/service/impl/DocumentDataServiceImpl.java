package com.mainServer.main_server.service.impl;

import com.mainServer.main_server.dto.request.DocumentDataRequestDto;
import com.mainServer.main_server.dto.request.URLRequestDto;
import com.mainServer.main_server.entity.DocumentData;
import com.mainServer.main_server.entity.User;
import com.mainServer.main_server.repository.DocumentDataRepository;
import com.mainServer.main_server.service.DocumentDataService;
import com.mainServer.main_server.service.FileUploadService;
import com.mainServer.main_server.utils.ChunkingInRAG;
import com.mainServer.main_server.utils.UploadInRAG;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class DocumentDataServiceImpl implements DocumentDataService {

    private final DocumentDataRepository documentDataRepository;
    private final FileUploadService fileUploadService;
    private final UploadInRAG uploadInRAG;
    private final ChunkingInRAG chunkingInRAG;

    @Override
    public Map<String, Object> uploadDocumentData(DocumentDataRequestDto dataRequestDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Map<String, Object> datas;
        if(dataRequestDto.getFile() == null){
            throw new RuntimeException("File is required");
        }

        datas = fileUploadService.uploadFile(dataRequestDto.getFile());
        System.out.println("File uploaded successfully: " + datas);
        DocumentData documentD = DocumentData.builder()
                .url(datas.get("fileUrl").toString())
                .fileName((String) datas.get("fileName"))
                .fileId(datas.get("fileId").toString())
                .fileType(datas.get("mimetype").toString())
                .size(datas.get("size").toString())
                .userId(user.getId())
                .build();

        documentDataRepository.save(documentD);

        Map <String, Object> response = uploadInRAG.uploadFileInRAG(dataRequestDto.getFile(), user.getId());

        Map <String, Object> chunkingResponse = chunkingInRAG.startChunking(user.getId());

        return Map.of("message", "File uploaded successfully");
    }

    @Override
    public Map<String, Object> uploadWebURL(URLRequestDto webURLRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Map<String, Object> datas;
        if(webURLRequest.getUrl() == null){
            throw new RuntimeException("File is required");
        }

        Map<String, Object> response = uploadInRAG.uploadURLInRAG(webURLRequest.getUrl(), user.getId());

        Map <String, Object> chunkingResponse = chunkingInRAG.startChunking(user.getId());

        return Map.of("message", "URL uploaded successfully");
    }
}
