package com.a105.api.service;

import com.a105.api.response.AuthResponse;
import com.a105.api.response.UserInfoResponse;
import com.a105.domain.oauth2.AuthorizationGoogleDto;
import com.a105.domain.oauth2.AuthorizationKakaoDto;
import com.a105.domain.oauth2.AuthorizationNaverDto;
import com.a105.domain.user.UserRepository;
import com.a105.domain.user.UserRole;
import com.a105.security.jwt.AuthToken;
import com.a105.security.jwt.AuthTokenProvider;
import com.a105.security.oauth2.OAuth2GoogleUtil;
import com.a105.security.oauth2.OAuth2KakaoUtil;
import com.a105.security.oauth2.OAuth2NaverUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final OAuth2NaverUtil oAuth2NaverUtil;
    private final OAuth2KakaoUtil oAuth2KakaoUtil;
    private final OAuth2GoogleUtil oAuth2GoogleUtil;
    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthTokenProvider authTokenProvider;

    public AuthResponse oAuth2AuthorizationGoogle(String code, String redirectUri){
        AuthorizationGoogleDto authorizationGoogleDto = oAuth2GoogleUtil.getAccessTokenByCode(code, redirectUri);
        AuthResponse authResponse = oAuth2GoogleUtil.getUserInfoByAccessToken(authorizationGoogleDto.getAccess_token());
        return checkUserExists(authResponse);
    }

    public AuthResponse oAuth2AuthorizationKakao(String code, String redirectUri){
        AuthorizationKakaoDto authorizationKakaoDto = oAuth2KakaoUtil.getAccessTokenByCode(code, redirectUri);
        AuthResponse authResponse = oAuth2KakaoUtil.getUserInfoByAccessToken(authorizationKakaoDto.getAccess_token());
        return checkUserExists(authResponse);
    }

    public AuthResponse oAuth2AuthorizationNaver(String code, String redirectUri){
        AuthorizationNaverDto authorizationNaverDto = oAuth2NaverUtil.getAccessTokenByCode(code, redirectUri);
        AuthResponse authResponse = oAuth2NaverUtil.getUserInfoByAccessToken(authorizationNaverDto.getAccess_token());
        return checkUserExists(authResponse);
    }

    public AuthResponse checkUserExists(AuthResponse authResponse){
        AuthResponse result = userRepository.findByEmailAndProvider(authResponse.getEmail(), authResponse.getProvider())
            .map(oAuth2User -> {
                authResponse.setAccessToken(authTokenProvider.createToken(oAuth2User.getId()).getToken());
                authResponse.setId(oAuth2User.getId());
                authResponse.setRole(UserRole.USER);
                return authResponse;
            }).orElseGet(() -> {
                authResponse.setRole(UserRole.ANONYMOUS);
                return authResponse;
            });
        return result;
    }

    public UserInfoResponse getUserInfoFromToken(String token){
        AuthToken authToken = authTokenProvider.convertAuthToken(token);
        Claims claims = authToken.getTokenClaims();
        if (claims == null) {
            return null;
        }
        Long userId = Long.parseLong(claims.getSubject());
        return UserInfoResponse.fromEntity(userService.findById(userId));
    }

}
