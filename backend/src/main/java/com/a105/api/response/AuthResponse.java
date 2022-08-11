package com.a105.api.response;

import com.a105.domain.oauth2.AuthProvider;
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
    @Setter
    private UserRole role;
    @Setter
    private String accessToken;

    public static AuthResponse of(String email, String nickname, AuthProvider provider){
        return AuthResponse.builder()
            .email(email)
            .nickname(nickname)
            .provider(provider)
            .build();
    }

    @Override
    public String toString() {
        return "AuthResponse{" +
            "id=" + id +
            ", email='" + email + '\'' +
            ", nickname='" + nickname + '\'' +
            ", provider=" + provider +
            ", role=" + role +
            '}';
    }
}
