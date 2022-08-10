package com.a105.security.oauth2.user;

import com.a105.domain.oauth2.AuthProvider;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getProvider() {
        return AuthProvider.NAVER.toString();
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

}
