package com.a105.domain.oauth2;

import lombok.Data;

@Data
public class AuthorizationKakaoDto {

    private String access_token;
    private String refresh_token;
    private String token_type;
    private String expires_in;
    private String scope;
    private String refresh_token_expires_in;

}
