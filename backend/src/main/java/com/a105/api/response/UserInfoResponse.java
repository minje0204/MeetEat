package com.a105.api.response;

import com.a105.domain.tray.Tray;
import com.a105.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class UserInfoResponse {
    private Long id;

    private String email;

    private String nickname;

    private String profile;

    private String bio;

    private List<Tray> trayAlbum;

    public static UserInfoResponse fromEntity(User user){
        return UserInfoResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .bio(user.getBio())
                .trayAlbum(user.getTrayAlbum())
                .build();
    }
}
