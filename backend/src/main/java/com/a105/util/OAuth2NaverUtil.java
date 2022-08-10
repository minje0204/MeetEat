package com.a105.util;

import com.a105.api.response.OAuth2Response;
import com.a105.domain.oauth2.AuthProvider;
import com.a105.domain.oauth2.AuthorizationNaverDto;
import com.a105.exception.OAuth2ProcessingException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class OAuth2NaverUtil {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${oauth2.provider.naver.client-id}")
    private String clientId;
    @Value("${oauth2.provider.naver.client-secret}")
    private String clientSecret;
    @Value("${oauth2.provider.naver.token-uri}")
    private String tokenUri;
    @Value("${oauth2.provider.naver.user-info-uri}")
    private String userInfoUri;


    public AuthorizationNaverDto getAccessTokenByCode(String code, String redirectUri){
        ResponseEntity<String> accessTokenResponse = OAuth2Util.getAccessTokenByCode("authorization_code", clientId, clientSecret, code, redirectUri, tokenUri);
        try {
            return objectMapper.readValue(accessTokenResponse.getBody(), AuthorizationNaverDto.class);
        } catch (JsonProcessingException e){
            e.printStackTrace();
            throw new OAuth2ProcessingException("CANNOT READ ACCESS TOKEN RESPONSE");
        }
    }

    public OAuth2Response getUserInfoByAccessToken(String accessToken){
        String userInfo = OAuth2Util.getUserInfoByAccessToken(accessToken, userInfoUri);

        JSONObject jsonObject = new JSONObject(userInfo);
        JSONObject jsonResponse = (JSONObject) jsonObject.get("response");
        OAuth2Response oAuth2Response = OAuth2Response.of(
            jsonResponse.getString("email"),
            jsonResponse.getString("name"),
            AuthProvider.NAVER
        );
        return oAuth2Response;
    }
}
