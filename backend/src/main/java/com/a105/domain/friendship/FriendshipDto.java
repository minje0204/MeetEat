package com.a105.domain.friendship;

import com.a105.domain.friendship.Friendship;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class FriendshipDto {

    private Long id;
    private Long friendId;
    private int status;
    private boolean received;

    @QueryProjection
    public FriendshipDto(Long id, Long friendId, int status, boolean received){
        this.id = id;
        this.friendId = friendId;
        this.status = status;
        this.received = received;
    }


//    private String email;
//    private String nickname;
//    private String profile;
//    private String bio;
//    private List<Tray> trayAlbum;

//    private UserInfoResponse friendInfo;
//
//    private Long id;
//    private Long userId;
//    private Long friendId;
//    private int status;
//
//    public static FriendResponse fromEntity(User friend, Friendship friendship){
//        return FriendResponse.builder()
//            .friendInfo(UserInfoResponse.fromEntity(friend))
//            .id(friendship.getId())
//            .userId(friendship.getUserId())
//            .friendId(friendship.getFriendId())
//            .status(friendship.getStatus())
//            .build();
//    }

}
