package com.a105.api.controller;

import com.a105.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    @GetMapping("/admin")
    public ResponseEntity<?> admin(){
        return new ResponseEntity<>("Admin", HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(){
        return new ResponseEntity<>("Login", HttpStatus.OK);
    }


    @GetMapping("/test/oauth/login")
    public ResponseEntity<?> testOAuthLogin(Authentication authentication, @AuthenticationPrincipal OAuth2User oauth){
        System.out.println("/test/oauth/login =========================");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("authentication : " + oAuth2User.getAttributes());
        System.out.println("oauth2User : " + oauth.getAttributes());

        return new ResponseEntity<>("OAuth Session", HttpStatus.OK);

    }

    // OAuth 로그인을 해도 Principal, 일반 로그인을 해도 Principal
    // Authentication으로 접근하면 Principal로 downcasting 해야되는데
    // annotation만으로도 가능
    @GetMapping("/test/login")
    public ResponseEntity<?> testLogin(@AuthenticationPrincipal UserPrincipal userPrincipal){
        System.out.println("UserPrincipal : " + userPrincipal.getEmail());
        return new ResponseEntity<>("Session", HttpStatus.OK);
    }
}
