package com.a105.api.controller;

import com.a105.api.request.SignupRequest;
import com.a105.api.response.AuthResponse;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.AuthService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.a105.api.response.ResponseMessage.*;

@RestController
@RequestMapping(value = "/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping(value = "/login/google")
    public ResponseEntity<?> googleOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationGoogle(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }

    @GetMapping(value = "/login/kakao")
    public ResponseEntity<?> kakaoOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationKakao(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }

    @GetMapping(value = "/login/naver")
    public ResponseEntity<?> naverOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationNaver(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }

    @PostMapping(value = "/signup", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> registerNewUser(@RequestPart("data") SignupRequest signupRequest, @RequestPart(required = false) MultipartFile file){
        AuthResponse authResponse = authService.registerNewUser(signupRequest, file);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, SIGN_UP, authResponse));
    }

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request){
        String headerValue = request.getHeader("Authorization");
        String token = headerValue.substring("Bearer ".length());
        UserInfoResponse userInfoResponse = authService.getUserInfoFromToken(token);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_CURRENT_USER, userInfoResponse));
    }

}
