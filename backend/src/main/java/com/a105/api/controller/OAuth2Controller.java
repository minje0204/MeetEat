package com.a105.api.controller;

import com.a105.api.response.DefaultResponse;
import com.a105.api.response.OAuth2Response;
import com.a105.api.response.ResponseCode;
import com.a105.api.service.OAuth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import static com.a105.api.response.ResponseMessage.*;

@RestController
@RequestMapping(value = "/login/oauth2/code")
@RequiredArgsConstructor
public class OAuth2Controller {

    @Autowired
    OAuth2Service oAuth2Service;

    @GetMapping(value = "/kakao")
    public ResponseEntity<?> kakaoOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        OAuth2Response oAuth2Response = oAuth2Service.oAuth2AuthotizationKakao(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, oAuth2Response));
    }

    @GetMapping(value = "/naver")
    public ResponseEntity<?> naverOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        OAuth2Response oAuth2Response = oAuth2Service.oAuth2AuthotizationNaver(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, oAuth2Response));
    }

    @GetMapping(value = "/google")
    public ResponseEntity<?> googleOAuthRedirect(@RequestParam String code, @RequestParam("redirect_uri") String redirectUri){
        OAuth2Response oAuth2Response = oAuth2Service.oAuth2AuthotizationGoogle(code, redirectUri);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, OAUTH2_LOGIN, oAuth2Response));
    }


}
