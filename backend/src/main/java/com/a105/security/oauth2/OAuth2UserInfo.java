package com.a105.security.oauth2;

import com.a105.domain.user.AuthProvider;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getProvider();

    public abstract String getProviderId();

//    public abstract String getImageUrl();
}
