package com.a105.api.service;

import com.a105.api.response.OAuth2Response;
import com.a105.domain.oauth2.AuthorizationGoogleDto;
import com.a105.domain.oauth2.AuthorizationKakaoDto;
import com.a105.domain.oauth2.AuthorizationNaverDto;
import com.a105.domain.user.UserRepository;
import com.a105.domain.user.UserRole;
import com.a105.security.AuthTokenProvider;
import com.a105.util.OAuth2GoogleUtil;
import com.a105.util.OAuth2KakaoUtil;
import com.a105.util.OAuth2NaverUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuth2Service {

    @Autowired
    private OAuth2NaverUtil oAuth2NaverUtil;
    @Autowired
    private OAuth2KakaoUtil oAuth2KakaoUtil;
    @Autowired
    private OAuth2GoogleUtil oAuth2GoogleUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthTokenProvider authTokenProvider;

    public OAuth2Response oAuth2AuthotizationNaver(String code, String redirectUri){
        AuthorizationNaverDto authorizationNaverDto = oAuth2NaverUtil.getAccessTokenByCode(code, redirectUri);
        OAuth2Response oAuth2Response = oAuth2NaverUtil.getUserInfoByAccessToken(authorizationNaverDto.getAccess_token());
        return checkUserExists(oAuth2Response);
    }

    public void oAuth2AuthotizationKakao(String code, String redirectUri){
        AuthorizationKakaoDto authorizationKakaoDto = oAuth2KakaoUtil.getAccessTokenByCode(code, redirectUri);
        OAuth2Response oAuth2Response = oAuth2KakaoUtil.getUserInfoByAccessToken(authorizationKakaoDto.getAccess_token());
        checkUserExists(oAuth2Response);
    }

    public void oAuth2AuthotizationGoogle(String code, String redirectUri){
        AuthorizationGoogleDto authorizationgoogleDto = oAuth2GoogleUtil.getAccessTokenByCode(code, redirectUri);
        OAuth2Response oAuth2Response = oAuth2GoogleUtil.getUserInfoByAccessToken(authorizationgoogleDto.getAccess_token());
        checkUserExists(oAuth2Response);
    }

    public OAuth2Response checkUserExists(OAuth2Response oAuth2Response){
        OAuth2Response result = userRepository.findByEmailAndProvider(oAuth2Response.getEmail(), oAuth2Response.getProvider())
            .map(oAuth2User -> {
//                oAuth2Response.setJwt(jwtService.createJwt(oAuth2User.getId(), "Check User"));
                oAuth2Response.setJwt(authTokenProvider.createToken(oAuth2User.getId()).getToken());
                oAuth2Response.setId(oAuth2User.getId());
                oAuth2Response.setRole(UserRole.USER);
                return oAuth2Response;
            }).orElseGet(() -> {
                oAuth2Response.setRole(UserRole.ANONYMOUS);
                return oAuth2Response;
            });
        System.out.println("Role:"+ result.getRole());
        System.out.println("Jwt: " + result.getJwt());
        return result;
    }
}
