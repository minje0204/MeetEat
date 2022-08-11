package com.a105.security.oauth2;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

public class OAuth2Util {
    private static final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();
    public static MultiValueMap<String, String> accessTokenParams(String grantType, String clientId,
        String clientSecret, String code, String redirect_uri) {
        MultiValueMap<String, String> accessTokenParams = new LinkedMultiValueMap<>();
        accessTokenParams.add("grant_type", grantType);
        accessTokenParams.add("client_id", clientId);
        accessTokenParams.add("client_secret", clientSecret);
        accessTokenParams.add("code", code);
        accessTokenParams.add("redirect_uri", redirect_uri);
        return accessTokenParams;
    }

    public static ResponseEntity<String> getAccessTokenByCode(String grantType, String clientId,
        String clientSecret, String code, String redirectUri, String tokenUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = accessTokenParams("authorization_code", clientId, clientSecret, code, redirectUri);

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(params, headers);
        return restTemplate.postForEntity(tokenUri, tokenRequest, String.class);
    }

    public static String getUserInfoByAccessToken(String accessToken, String userInfoUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> userInfoRequest = new HttpEntity<>(headers);
        ResponseEntity<String> profileResponse = restTemplate.exchange(userInfoUri, HttpMethod.GET, userInfoRequest, String.class);
        return profileResponse.getBody();
    }
}
