package com.a105.security.oauth2;

import com.a105.domain.user.AuthProvider;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRepository;
import com.a105.security.UserPrincipal;
import com.a105.security.oauth2.provider.GoogleOAuth2UserInfo;
import com.a105.security.oauth2.provider.KakaoOAuth2UserInfo;
import com.a105.security.oauth2.provider.NaverOAuth2UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration : " + userRequest.getClientRegistration());
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);

        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 회원가입을 강제로 진행해볼 예정
        OAuth2UserInfo oAuth2UserInfo = null;
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())){
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleOAuth2UserInfo(oAuth2User.getAttributes());
        } else if(registrationId.equalsIgnoreCase(AuthProvider.naver.toString())){
            System.out.println("네이버 로그인 요청");
            oAuth2UserInfo = new NaverOAuth2UserInfo((Map) oAuth2User.getAttributes().get("response"));
        }  else if(registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())){
            System.out.println("카카오 로그인 요청");
            oAuth2UserInfo = new KakaoOAuth2UserInfo(oAuth2User.getAttributes());
        } else {
            System.out.println("지원하지 않는 플랫폼입니다.");
        }

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String nickname = oAuth2UserInfo.getName();
        String password = bCryptPasswordEncoder.encode("A105");
        String email = oAuth2UserInfo.getEmail();

        User user = userRepository.findByEmailAndProvider(email, AuthProvider.valueOf(provider));

        if(user == null){
            user = User.builder()
                    .email(email)
                    .nickname(nickname)
                    .password(password)
                    .provider(AuthProvider.valueOf(provider))
                    .providerId(providerId)
                    .build();
            userRepository.save(user);
        } else {
            System.out.println("이미 회원가입되어있습니다.");
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }
}
