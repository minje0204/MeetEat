package com.a105.api.response;

import com.a105.domain.friendship.Friendship;
import com.a105.domain.friendship.FriendshipDto;
import com.a105.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class FriendInfoResponse {

    private UserInfoResponse friendInfo;

    private Long id;

    private int status;

    private boolean isReceived;

    public static FriendInfoResponse fromEntity(User user, FriendshipDto friendship){
        return FriendInfoResponse.builder()
            .friendInfo(UserInfoResponse.fromEntity(user))
            .id(friendship.getId())
            .status(friendship.getStatus())
            .isReceived(friendship.isReceived())
            .build();
    }

}
