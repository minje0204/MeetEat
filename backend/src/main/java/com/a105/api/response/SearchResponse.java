package com.a105.api.response;

import com.a105.domain.tray.Tray;
import com.a105.domain.user.User;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class SearchResponse {
    private Long id;

    private String email;

    private String nickname;

    private String profile;

    private String bio;

    private List<Tray> trayAlbum;

    private int status;

    public static SearchResponse of(User user, int status){
        return SearchResponse.builder()
            .id(user.getId())
            .email(user.getEmail())
            .nickname(user.getNickname())
            .profile(user.getProfile())
            .bio(user.getBio())
            .trayAlbum(user.getTrayAlbum())
            .status(status)
            .build();
    }
}
