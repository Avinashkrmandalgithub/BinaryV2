package com.mainServer.main_server.service.impl;

import com.mainServer.main_server.dto.request.PlanChangeRequestDto;
import com.mainServer.main_server.dto.request.SignUpRequestDto;
import com.mainServer.main_server.dto.response.CurrentUserDto;
import com.mainServer.main_server.dto.response.LoginResponseDto;
import com.mainServer.main_server.dto.response.PlanChangeResponseDto;
import com.mainServer.main_server.entity.User;
import com.mainServer.main_server.entity.type.AuthProviderType;
import com.mainServer.main_server.entity.type.Payment;
import com.mainServer.main_server.repository.UserRepository;
import com.mainServer.main_server.security.AuthUtil;
import com.mainServer.main_server.service.UserService;
import com.mainServer.main_server.utils.CommonUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthUtil authUtil;
    private final PasswordEncoder passwordEncoder;

    public User signUpInternal(SignUpRequestDto signUpRequestDto, AuthProviderType authProviderType, String providerId){
        User user = userRepository.findByEmail(signUpRequestDto.getEmail()).orElse(null);

        if (user != null) throw new IllegalArgumentException("User already exists");

        user = User.builder()
                .email(signUpRequestDto.getEmail())
                .providerId(providerId)
                .authProviderType(authProviderType)
                .build();

        if (authProviderType == AuthProviderType.EMAIL){
            user.setPassword(passwordEncoder.encode(signUpRequestDto.getPassword()));
        }

        return userRepository.save(user);
    }

    @Override
    public ResponseEntity<LoginResponseDto> handleOAuth2LoginRequest(OAuth2User auth2User, String registrationId) {
        AuthProviderType providerType = authUtil.getProviderTypeFromRegistrationId(registrationId);
        String providerId = authUtil.determineProviderIdFromOAuth2User(auth2User, registrationId);

        User user = userRepository.findByProviderIdAndAuthProviderType(providerId,providerType).orElse(null);
        String email = auth2User.getAttribute("email");

        User emailUser = userRepository.findByEmail(email).orElse(null);

        if (user == null && emailUser == null){
            String userEmail = authUtil.determineEmailFromOAuth2User(auth2User,registrationId,providerId);
            String name = authUtil.determineNameFromOAuth2User(auth2User,registrationId);
            String avatar = authUtil.determineAvatarFromOAuth2User(auth2User, registrationId);
            user = User.builder()
                    .email(userEmail)
                    .name(name)
                    .payment(Payment.FREE)
                    .avatar(avatar)
                    .providerId(providerId)
                    .authProviderType(AuthProviderType.valueOf(registrationId.toUpperCase()))
                    .build();

            userRepository.save(user);

        } else if (user != null) {
            if (email != null && !email.isBlank() && !email.equals(user.getEmail())){
                user.setEmail(email);
                userRepository.save(user);
            }
        } else {
            throw new BadCredentialsException("This email is already registered with provider "+emailUser.getAuthProviderType());
        }

        LoginResponseDto loginResponseDto = new LoginResponseDto(authUtil.generateAccessToken(user),user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(loginResponseDto);
    }

    @Override
    public Map<String, Object> createApiKey() {
        String apiKey = CommonUtil.generateUniqueId();

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        user.setApiKey(apiKey);
        userRepository.save(user);

        return Map.of("apiKey", apiKey);
    }

    @Override
    public CurrentUserDto currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return CurrentUserDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .avatar(user.getAvatar())
                .build();
    }

    @Override
    public PlanChangeResponseDto changePlan(PlanChangeRequestDto planChangeRequestDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        user.setPayment(planChangeRequestDto.getPayment());

        userRepository.save(user);

        return PlanChangeResponseDto.builder()
                .payment(user.getPayment())
                .email(user.getEmail())
                .name(user.getName())
                .build();
    }

    @Override
    public Map<String, Object> userPlanInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        return Map.of(
                "payment", user.getPayment()
        );
    }
}
