package com.a105.api.controller;

import com.a105.api.response.OAuth2Response;
import com.a105.api.service.OAuth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/login/oauth2/code")
@RequiredArgsConstructor
public class OAuth2Controller {

    @Autowired
    OAuth2Service oAuth2Service;

    @GetMapping(value = "/kakao")
    public String kakaoOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        System.out.println("KAKAO API");
        oAuth2Service.oAuth2AuthotizationKakao(code, redirectUri);
        return "카카오 로그인 인증 완료, code = " + code;
    }

    @GetMapping(value = "/naver")
    public String naverOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        System.out.println("NAVER API");
        OAuth2Response oAuth2Response = oAuth2Service.oAuth2AuthotizationNaver(code, redirectUri);
        return "네이버 로그인 인증 완료, token = " + oAuth2Response.getJwt();
    }

    @GetMapping(value = "/google")
    public String googleOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        System.out.println("GOOGLE API");
        oAuth2Service.oAuth2AuthotizationGoogle(code, redirectUri);
        return "구글 로그인 인증 완료, code = " + code;
    }


}
