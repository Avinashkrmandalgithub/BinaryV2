package com.mainServer.main_server.service;

import com.mainServer.main_server.dto.request.PlanChangeRequestDto;
import com.mainServer.main_server.dto.response.CurrentUserDto;
import com.mainServer.main_server.dto.response.LoginResponseDto;
import com.mainServer.main_server.dto.response.PlanChangeResponseDto;
import org.jspecify.annotations.Nullable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public interface UserService {

    ResponseEntity<LoginResponseDto> handleOAuth2LoginRequest(OAuth2User auth2User, String registrationId);

    Map<String, Object> createApiKey();

    CurrentUserDto currentUser();

    PlanChangeResponseDto changePlan(PlanChangeRequestDto planChangeRequestDto);

    Map<String, Object> userPlanInfo();
}
