package com.a105.api.response;

import com.a105.domain.tray.Tray;
import com.a105.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@Schema(description = "사용자 정보")
public class UserInfoResponse {
    @Schema(description = "auto-increment ID", example = "1")
    private Long id;

    @Schema(description = "이메일", example = "aaa@gmail.com")
    private String email;

    @Schema(description = "별명", example = "하연")
    private String nickname;

    @Schema(description = "프로필 사진 url", example = "https://meeteat-bucket.s3.ap-northeast-2.amazonaws.com/profile/1")
    private String profile;

    @Schema(description = "자기소개", example = "안녕하세요~~")
    private String bio;

    @Schema(description = "식탁 앨범")
    private List<Tray> trayAlbum;

    public static UserInfoResponse fromEntity(User user) {
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
