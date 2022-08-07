package com.a105.api.response;

import com.a105.domain.friendship.FriendshipDto;
import com.a105.domain.user.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@Schema(description = "친구 관계 정보")
public class FriendInfoResponse {

    @Schema(description = "친구 사용자 정보")
    private UserInfoResponse friendInfo;

    @Schema(description = "auto-increment ID", example = "1")
    private Long id;

    @Schema(description = "친구 요청 상태", example = "0", allowableValues = {"0", "1"})
    private int status;

    @Schema(description = "요청 수신 여부", example = "true", allowableValues = {"true", "false"})
    private boolean received;

    public static FriendInfoResponse fromEntity(User user, FriendshipDto friendship){
        return FriendInfoResponse.builder()
            .friendInfo(UserInfoResponse.fromEntity(user))
            .id(friendship.getId())
            .status(friendship.getStatus())
            .received(friendship.isReceived())
            .build();
    }

}
