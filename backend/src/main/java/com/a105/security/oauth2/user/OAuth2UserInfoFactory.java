package com.a105.security.oauth2.user;

import com.a105.domain.user.AuthProvider;
import com.a105.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes){
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())){
            System.out.println("구글 로그인 요청");
            return new GoogleOAuth2UserInfo(attributes);
        } else if(registrationId.equalsIgnoreCase(AuthProvider.naver.toString())){
            System.out.println("네이버 로그인 요청");
            return new NaverOAuth2UserInfo((Map) attributes.get("response"));
        }  else if(registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())){
            System.out.println("카카오 로그인 요청");
            return new KakaoOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException(registrationId + "은(는) 지원하지 않는 플랫폼입니다.");
        }
    }

}
