package com.a105.security.oauth2.user;

import com.a105.domain.user.AuthProvider;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    Map<String, Object> kakaoAccount, kakaoProfile;

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        kakaoAccount = (Map) attributes.get("kakao_account");
        kakaoProfile = (Map) kakaoAccount.get("profile");
    }

    @Override
    public String getName() {
        return (String) kakaoProfile.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) kakaoAccount.get("email");
    }

    @Override
    public String getProvider() {
        return AuthProvider.kakao.toString();
    }

    @Override
    public String getProviderId() {
        return Long.toString((Long) attributes.get("id"));
    }

}
