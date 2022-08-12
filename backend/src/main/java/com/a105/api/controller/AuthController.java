package com.a105.api.controller;

import com.a105.api.response.AuthResponse;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.AuthService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import static com.a105.api.response.ResponseMessage.*;

@RestController
@RequestMapping(value = "/login/oauth2/code")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping(value = "/google")
    public ResponseEntity<?> googleOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationGoogle(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }

    @GetMapping(value = "/kakao")
    public ResponseEntity<?> kakaoOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationKakao(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }

    @GetMapping(value = "/naver")
    public ResponseEntity<?> naverOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        AuthResponse authResponse = authService.oAuth2AuthorizationNaver(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, authResponse));
    }



    @GetMapping("/info")
    public String getUserInfo(HttpServletRequest request){
        String headerValue = request.getHeader("Authorization");
        String token = headerValue.substring("Bearer ".length());
        UserInfoResponse userInfoResponse = authService.getUserInfoFromToken(token);
        return "Success : " + userInfoResponse.getId();
    }

}
