package com.a105.api.response;

import com.a105.domain.oauth2.AuthProvider;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRole;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class AuthResponse {
    @Setter
    private Long id;
    private String email;
    private String nickname;
    private AuthProvider provider;
    private String profile;
    private String bio;
    @Setter
    private UserRole role;
    private String accessToken;

    public static AuthResponse of(String email, String nickname, AuthProvider provider){
        return AuthResponse.builder()
            .email(email)
            .nickname(nickname)
            .provider(provider)
            .build();
    }

    public static AuthResponse toUser(AuthResponse authResponse, User user, UserRole role, String accessToken){
        return AuthResponse.builder()
            .id(user.getId())
            .email(authResponse.getEmail())
            .nickname(user.getNickname())
            .provider(authResponse.getProvider())
            .profile(user.getProfile())
            .bio(user.getBio())
            .role(role)
            .accessToken(accessToken)
            .build();
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
            "id=" + id +
            ", email='" + email + '\'' +
            ", nickname='" + nickname + '\'' +
            ", provider=" + provider +
            ", profile='" + profile + '\'' +
            ", bio='" + bio + '\'' +
            ", role=" + role +
            '}';
    }
}
