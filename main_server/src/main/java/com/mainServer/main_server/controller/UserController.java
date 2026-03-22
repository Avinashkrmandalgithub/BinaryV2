package com.mainServer.main_server.controller;

import com.mainServer.main_server.dto.request.PlanChangeRequestDto;
import com.mainServer.main_server.dto.response.CurrentUserDto;
import com.mainServer.main_server.dto.response.PlanChangeResponseDto;
import com.mainServer.main_server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/api-key")
    ResponseEntity<Map<String, Object>> createApiKey(){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createApiKey());
    }

    @GetMapping("/current-user")
    ResponseEntity<CurrentUserDto> getCurrentUser(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.currentUser());
    }

    @PostMapping("/change-plan")
    ResponseEntity<PlanChangeResponseDto> changePlan(@RequestBody PlanChangeRequestDto planChangeRequestDto) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.changePlan(planChangeRequestDto));
    }

    @GetMapping("/plan-info")
    ResponseEntity<Map<String,Object>> userPlanInfo(){
        return ResponseEntity.status(HttpStatus.OK).body(userService.userPlanInfo());
    }
}
