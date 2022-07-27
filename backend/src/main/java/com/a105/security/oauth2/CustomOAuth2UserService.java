package com.a105.security.oauth2;

import com.a105.domain.user.AuthProvider;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRepository;
import com.a105.security.UserPrincipal;
import com.a105.security.oauth2.provider.GoogleOAuth2UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

//    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    // google로부터 받은 userRequest 데이터에 대한 후처리되는 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration : " + userRequest.getClientRegistration());   //registrationId로 어떤 OAuth로 로그인했는지 확인 가능.
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 구글 로그인 버튼 -> 구글 로그인 창 -> 로그인 완료 -> code 리턴(OAuth-Client 라이브러리) -> AccessToken 요청
        // userRequest 정보 -> loadUser 함수 호출 -> 구글로부터 프로필 받아옴.
        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 회원가입을 강제로 진행해볼 예정
        OAuth2UserInfo oAuth2UserInfo = null;
        String registrationId = userRequest.getClientRegistration().getRegistrationId();    // google
        if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())){
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleOAuth2UserInfo(oAuth2User.getAttributes());
        } else if(registrationId.equalsIgnoreCase(AuthProvider.naver.toString())){
            System.out.println("네이버 로그인 요청");
//            oAuth2UserInfo = new GoogleOAuth2UserInfo(oAuth2User.getAttributes());
        } else {

        }

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String nickname = (provider + "_" + providerId).substring(0, 20);
        String password = bCryptPasswordEncoder.encode("겟인데어");
        String email = oAuth2UserInfo.getEmail();
        String role= "ROLE_USER";


        User user = userRepository.findByEmail(email);

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
//        return super.loadUser(userRequest);
    }
}
