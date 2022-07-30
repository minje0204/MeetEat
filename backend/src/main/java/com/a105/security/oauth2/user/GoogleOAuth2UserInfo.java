package com.a105.security.oauth2.user;

import com.a105.domain.user.AuthProvider;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
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
        return AuthProvider.google.toString();
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

}
